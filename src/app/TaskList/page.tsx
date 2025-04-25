"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState } from "react";

export default function Home() {
    interface TaskObject {
        id: string;
        title: string;
        completed: boolean;
    }

    const [tasks, setTasks] = useState<TaskObject[]>([
        {
            id: "1",
            title: "buy some trash",
            completed: false,
        },
        {
            id: "2",
            title: "drink water",
            completed: false,
        },
        {
            id: "3",
            title: "big jug hot cheese",
            completed: true,
        },
    ]);
    console.log(tasks);

    const addTask = (title: string) => {
        const newTask: TaskObject = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (identifier: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === identifier
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    return (
        <>
            <h1>Welcome to the task list</h1>
            <h1>
                <NewTaskForm onAddTask={addTask} />
            </h1>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Task
                            id={task.id}
                            title={task.title}
                            completed={task.completed}
                            onUpdateTask={updateTask}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
