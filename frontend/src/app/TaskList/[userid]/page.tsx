"use client";
import NewTaskForm from "app/components/NewTaskForm";
import Task from "../../components/Task";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./TaskList.module.scss";
import { useParams } from "next/navigation";

export interface TaskObject {
    taskid: number;
    taskbody: string;
    taskdone: boolean;
    taskdate: number;
    taskrecurring: boolean;
    userid: number;
}

export default function TaskListPage() {
    const params = useParams();
    const userid = params.userid;
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState<TaskObject[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async (uid: number) => {
        if (!uid) return;

        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:5000/api/get_tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid: uid }),
            });

            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();
            console.log("Success:", data);
            setTasks(data.tasks);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userid) {
            const uid = Array.isArray(userid)
                ? parseInt(userid[0])
                : parseInt(userid);

            if (!isNaN(uid)) {
                fetchTasks(uid);
            }
        }
    }, [userid, fetchTasks]);

    const handleAddTask = async (title: string, date: number) => {
        if (!userid) {
            setStatus("Error: User not identified.");
            return;
        }
        const uid = Array.isArray(userid)
            ? parseInt(userid[0])
            : parseInt(userid);

        if (isNaN(uid)) {
            setStatus("Error: Invalid User ID.");
            return;
        }

        setStatus("Sending task...");

        const response = await fetch("http://127.0.0.1:5000/api/inserttask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskbody: title,
                taskdate: date,
                taskdone: 0,
                taskrecurring: 0,
                userid: userid,
            }),
        });

        if (response.ok) {
            setStatus("Successful task insert!");
            await fetchTasks(uid);
        } else {
            setStatus("Error sending data.");
        }
    };

    return (
        <div className={styles.taskListContainer}>
            <div className="header">
                <NewTaskForm onAddTask={handleAddTask} />
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
        </div>
    );
}
