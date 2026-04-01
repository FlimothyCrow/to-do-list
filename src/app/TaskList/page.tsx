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
    // const [sorter, setSorter] = useState<keyof TaskObject>("done");

    const [ascending, setAscending] = useState(true);

    const [tasks, setTasks] = useState<TaskObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/data")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.tasks);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading tasks...</p>;

    // const sortSelect = (key: keyof TaskObject) => {
    //     setSorter(key);
    // };

    // const sortTaskArray = <T extends TaskObject, K extends keyof T>(
    //     arrayOfObjects: T[],
    //     sorter: K,
    //     ascending: boolean,
    // ): T[] => {
    //     return arrayOfObjects.toSorted((a, b) => {
    //         const valueA = a[sorter];
    //         const valueB = b[sorter];

    //         const nameA = String(valueA).toUpperCase();
    //         const nameB = String(valueB).toUpperCase();
    //         if (ascending) {
    //             if (nameA < nameB) return -1;
    //             if (nameA > nameB) return 1;
    //         } else {
    //             if (nameA < nameB) return 1;
    //             if (nameA > nameB) return -1;
    //         }

    //         return 0;
    //     });
    // };

    return (
        <div className={styles.taskListContainer}>
            <div className="header">
                <NewTaskForm onAddTask={console.log} />
                {/* <SorterDropdown
                    sorter={sorter}
                    ascending={ascending}
                    onSortSelect={sortSelect}
                /> */}
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
        </div>
    );
}
