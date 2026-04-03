"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.scss";
import SorterDropdown from "../components/SorterDropdown";

export interface TaskObject {
    taskid: number;
    taskbody: string;
    taskdone: boolean;
    taskdate: number;
    taskrecurring: boolean;
    userid: number;
}

export default function Home() {
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState<TaskObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/data");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data.tasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    const handleAddUser = async () => {
        setStatus("Sending user...");

        const response = await fetch("http://127.0.0.1:5000/api/insertuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Jimjam",
                useremail: "jimothy@buxaplenty.net",
            }),
        });

        if (response.ok) {
            setStatus("Success user!");
        } else {
            setStatus("Error sending data.");
        }
    };

    const handleAddTask = async () => {
        setStatus("Sending task...");

        const response = await fetch("http://127.0.0.1:5000/api/inserttask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskbody: "pick up meds",
                taskdone: 0,
                taskdate: 20240402,
                taskrecurring: 1,
                userid: 2,
            }),
        });

        if (response.ok) {
            setStatus("Successful task insert!");
        } else {
            setStatus("Error sending data.");
        }
    };

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className={styles.taskListContainer}>
            <div className="header">
                <NewTaskForm onAddTask={console.log} />
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.taskid}>
                        <Task
                            taskbody={task.taskbody}
                            taskid={task.taskid}
                            taskdone={task.taskdone}
                            taskdate={task.taskdate}
                            taskrecurring={task.taskrecurring}
                            userid={task.userid}
                        />
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handleAddUser}>Send dummy user</button>

                <p>{status}</p>
            </div>
            <div>
                <button onClick={handleAddTask}>Send dummy task</button>
            </div>
        </div>
    );
}

// landing page enter username / email?
// tasklist will need all user info to display
//
