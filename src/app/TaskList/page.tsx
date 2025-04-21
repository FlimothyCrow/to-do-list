"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState } from "react";

export default function Home() {
    const [tasks, setTasks] = useState<string[]>([
        "buy some trash",
        "drink water",
        "big jug hot cheese",
    ]);

    const addTask = (title: string) => {
        setTasks((prev) => [...prev, title]);
    };

    return (
        <>
            <h1>Welcome to the task list</h1>
            <h1>
                <NewTaskForm onAddTask={addTask} />
            </h1>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <Task title={task} />
                    </li>
                ))}
            </ul>
        </>
    );
}
