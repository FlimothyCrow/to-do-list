"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState } from "react";
import Dropdown from "../components/Dropdown";

export interface TaskObject {
    UUID: string;
    title: string;
    completed: boolean;
}

export default function Home() {
    const [sorter, setSorter] = useState<keyof TaskObject>("completed");

    const [ascending, setAscending] = useState(true);

    const [tasks, setTasks] = useState<TaskObject[]>([
        {
            UUID: "1",
            title: "purchase some trash",
            completed: false,
        },
        {
            UUID: "2",
            title: "drink water",
            completed: true,
        },
        {
            UUID: "3",
            title: "big jug hot cheese",
            completed: false,
        },
    ]);
    console.log(tasks);

    const addTask = (title: string) => {
        const newTask: TaskObject = {
            UUID: crypto.randomUUID(),
            title,
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (identifier: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.UUID === identifier
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const sortSelect = (key: keyof TaskObject) => {
        setSorter(key);
    };

    const toggleDirection = () => {
        setAscending((prev) => !prev);
    };

    const sortTaskArray = <T extends TaskObject, K extends keyof T>(
        arrayOfObjects: T[],
        sorter: K,
        ascending: boolean
    ): T[] => {
        return arrayOfObjects.toSorted((a, b) => {
            const valueA = a[sorter];
            const valueB = b[sorter];

            const nameA = String(valueA).toUpperCase();
            const nameB = String(valueB).toUpperCase();
            if (ascending) {
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
            } else {
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
            }

            return 0;
        });
    };
    console.log(`sorter is set to ${sorter}`);
    return (
        <>
            <h1>Welcome to the task list</h1>
            <div className="header">
                {" "}
                <Dropdown
                    sorter={sorter}
                    ascending={ascending}
                    onSortSelect={sortSelect}
                    onToggleDirection={toggleDirection}
                />
                <h1>
                    <NewTaskForm onAddTask={addTask} />
                </h1>
            </div>

            <ul>
                {sortTaskArray(
                    tasks,
                    sorter as keyof TaskObject,
                    ascending
                ).map((task) => (
                    <li key={task.UUID}>
                        <Task
                            UUID={task.UUID}
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
