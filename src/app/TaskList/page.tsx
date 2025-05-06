"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../components/Task";
import React, { useState } from "react";
import SorterDropdown from "../components/SorterDropdown";

export interface TaskObject {
    UUID: string;
    title: string;
    date: number;
    completed: boolean;
}

export default function Home() {
    const [sorter, setSorter] = useState<keyof TaskObject>("completed");

    const [ascending, setAscending] = useState(true);

    const [tasks, setTasks] = useState<TaskObject[]>([
        {
            UUID: "1",
            title: "purchase some trash",
            date: 12345,
            completed: false,
        },
        {
            UUID: "2",
            title: "drink water",
            date: 1234567,
            completed: true,
        },
        {
            UUID: "3",
            title: "big jug hot cheese",
            date: 123456,
            completed: false,
        },
    ]);
    console.log(tasks);

    const addTask = (title: string, date: number) => {
        const newTask: TaskObject = {
            UUID: crypto.randomUUID(),
            title,
            date,
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

    return (
        <>
            <div className="header">
                <NewTaskForm onAddTask={addTask} />
                <SorterDropdown
                    sorter={sorter}
                    ascending={ascending}
                    onSortSelect={sortSelect}
                />
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
