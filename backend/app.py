import sqlite3
from flask import Flask, jsonify
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

        sql_files = ['schema/01_users.sql', 'schema/02_tasks.sql']
        for f_name in sql_files:
            with open(BASE_DIR / f_name, 'r') as f:
                conn.executescript(f.read())

        conn.commit()
        conn.close()

        # We only seed if it's the very first time
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

    # (taskbody, taskdone, taskdate, taskrecurring, user_id)
    tasks_to_add = [
        ('Buy Milk', 0, 20240401, 0, 1),  # For Alice (ID 1)
        ('Fix Sink', 0, 20240401, 1, 1),  # For Alice (ID 1)
        ('Car Wash', 1, 20240402, 0, 2)  # For Bob (ID 2)
    ]

    try:
        cursor.executemany(
            """INSERT INTO tasks (taskbody, taskdone, taskdate, taskrecurring, user_id)
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
@app.route('/api/data', methods=['GET'])
def get_data():
    conn = sqlite3.connect('to-do-list.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM tasks")
    rows = cur.fetchall()
    conn.close()

    # Convert the database rows into a list of dictionaries for JSON
    tasks_list = [
        {"taskid": r[0], "taskbody": r[1], "taskdone": bool(r[2]), "taskdate": bool(r[3]), "taskrecurring": bool(r[4]),
         "user_id": bool(r[5])}
        for r in rows]

    return jsonify({
        "status": "Success",
        "message": "Sophie is connected to SQLite!",
        "tasks": tasks_list
    })


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
