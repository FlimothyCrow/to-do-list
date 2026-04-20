import sqlite3
from flask import Flask, jsonify, request
from pathlib import Path
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "to-do-list.db"


# --- DATABASE SETUP (Runs once when the script starts) ---
def init_db():
    # Only run the SQL files if the database DOESN'T exist yet
    if not DB_PATH.exists():
        print("--- DATABASE NOT FOUND. INITIALIZING FRESH... ---")
        conn = sqlite3.connect(str(DB_PATH))
        conn.execute("PRAGMA foreign_keys = ON;")

        sql_files = ['../schema/01_users.sql', '../schema/02_tasks.sql']
        for f_name in sql_files:
            with open(BASE_DIR / f_name, 'r') as f:
                conn.executescript(f.read())

        conn.commit()
        conn.close()

        seed_users()
        seed_tasks()
        print("--- FIRST-TIME SETUP COMPLETE ---")
    else:
        # If it exists, we do nothing! Your data is safe.
        print("--- DATABASE FOUND. LOADING EXISTING DATA... ---")


def seed_users():
    conn = sqlite3.connect('to-do-list.db')
    cursor = conn.cursor()

    # List of tuples (username, useremail)
    # We don't include userid because it's AUTOINCREMENT
    users_to_add = [
        ('Alice', 'alice@example.com'),
        ('Bob', 'bob@example.com'),
        ('Charlie', 'charlie@example.com')
    ]

    try:
        # The ? are placeholders to prevent "SQL Injection" (hacking)
        cursor.executemany(
            "INSERT INTO users (username, useremail) VALUES (?, ?)",
            users_to_add
        )
        conn.commit()
        print(f"--- SEEDED {len(users_to_add)} USERS ---")
    except sqlite3.Error as e:
        print(f"--- SEED ERROR: {e} ---")
    finally:
        conn.close()


def seed_tasks():
    conn = sqlite3.connect('to-do-list.db')
    cursor = conn.cursor()

    # (taskbody, taskdone, taskdate, taskrecurring, userid)
    tasks_to_add = [
        ('Buy milk', 0, 20240401, 0, 1),  # (ID 1)
        ('Fix sink', 0, 20240401, 1, 1),  # (ID 1)
        ('Car wash', 1, 20240402, 0, 2),  # (ID 2)
        ('Eat some cheese', 1, 20240401, 0, 2),  # (ID 2)
        ('Three bags of trash', 0, 20240401, 1, 3),  # (ID 3)
    ]

    try:
        cursor.executemany(
            """INSERT INTO tasks (taskbody, taskdone, taskdate, taskrecurring, userid)
               VALUES (?, ?, ?, ?, ?)""",
            tasks_to_add
        )
        conn.commit()
        print(f"--- SEEDED {len(tasks_to_add)} TASKS ---")
    except sqlite3.Error as e:
        print(f"--- TASK SEED ERROR: {e} ---")
    finally:
        conn.close()


# --- ROUTES ---
@app.route('/api/get_tasks', methods=['POST'])  # Change GET to POST
def get_tasks():
    data = request.json
    if not data:
        return jsonify({"status": "Error", "message": "No JSON provided"}), 400

    userid = data.get('userid')

    conn = sqlite3.connect('to-do-list.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM tasks WHERE userid = ?;", (userid,))
    rows = cur.fetchall()
    conn.close()

    task_list = [
        {
            "taskid": r[0],
            "taskbody": r[1],
            "taskdone": bool(r[2]),
            "taskdate": r[3],
            "taskrecurring": bool(r[4]),
            "userid": r[5]
        } for r in rows
    ]

    return jsonify({
        "status": "Success",
        "tasks": task_list
    })


@app.route('/api/get_users', methods=['GET'])  # Change GET to POST
def get_users():

    conn = sqlite3.connect('to-do-list.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    conn.close()

    user_list = [
        {
            "userid": r[0],
            "username": r[1],
            "useremail": (r[2]),
        } for r in rows
    ]

    return jsonify({
        "status": "Success",
        "users": user_list
    })



@app.route('/api/insertuser', methods=['POST'])
def insert_user():

    data = request.json
    username = data.get('username')
    useremail = data.get('useremail')

    try:
        conn = sqlite3.connect('to-do-list.db')
        cur = conn.cursor()

        cur.execute("INSERT INTO users (username, useremail) VALUES (?, ?)",
                    (username, useremail))

        conn.commit()
        conn.close()

        return jsonify({"status": "Success", "message": f"User {username} added!"}), 201
    except Exception as e:
        return jsonify({"status": "Error", "message": str(e)}), 500


@app.route('/api/inserttask', methods=['POST'])
def insert_task():
    data = request.json
    taskbody = data.get('taskbody')
    taskdone = data.get('taskdone')
    taskdate = data.get('taskdate')
    taskrecurring = data.get('taskrecurring')
    userid = data.get('userid')

    conn = None # Initialize so the 'finally' block knows it exists
    try:
        conn = sqlite3.connect('to-do-list.db')
        conn.execute("PRAGMA foreign_keys = ON;")
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO tasks (taskbody, taskdone, taskdate, taskrecurring, userid) VALUES (?, ?, ?, ?, ?)",
            (taskbody, taskdone, taskdate, taskrecurring, userid)
        )

        conn.commit()
        return jsonify({"status": "Success", "message": f"Task '{taskbody}' added!"}), 201

    except sqlite3.IntegrityError as e:
        print(f"Foreign Key Violation: {e}")
        return jsonify({
            "status": "Error",
            "message": f"Invalid User ID: {userid}. Task rejected."
        }), 400

    except Exception as e:
        return jsonify({"status": "Error", "message": str(e)}), 500

    finally:
        # This ensures the connection closes even if the code crashes
        if conn:
            conn.close()

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
