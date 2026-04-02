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
    user_id: number;
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

    const handleSubmit = async () => {
        setStatus("Sending...");

        const response = await fetch("http://127.0.0.1:5000/api/insertuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Billiam",
                useremail: "bill@buxaplenty.net",
            }),
        });

        if (response.ok) {
            setStatus("Success!");
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
                            user_id={task.user_id}
                        />
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handleSubmit}>Send Data</button>
                <p>{status}</p>
            </div>
        </div>
    );
}

// landing page enter username / email?
// tasklist will need all user info to display
//
