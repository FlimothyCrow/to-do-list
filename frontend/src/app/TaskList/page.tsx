"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.scss";

export interface TaskObject {
    taskid: number;
    taskbody: string;
    taskdone: boolean;
    taskdate: number;
    taskrecurring: boolean;
    userid: number;
}

export default function Home() {
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState<TaskObject[]>([]);
    const [loading, setLoading] = useState(true);

    const getTasks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const userid = formData.get("userid") as string;

        try {
            const res = await fetch("http://127.0.0.1:5000/api/get_tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid }),
            });

            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();
            console.log("Success:", data);
            setTasks(data.tasks);
        } catch (err) {
            console.error("Submission error:", err);
        } finally {
            setLoading(false);
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
                <button onClick={handleAddTask}>Send dummy task</button>
            </div>
            <div>
                <form onSubmit={getTasks}>
                    <input
                        name="userid"
                        type="userid"
                        placeholder="Please enter user ID"
                        required
                        className="text-white p-2 border"
                    />
                    <button type="submit">{"Submit"}</button>
                </form>
            </div>
        </div>
    );
}
