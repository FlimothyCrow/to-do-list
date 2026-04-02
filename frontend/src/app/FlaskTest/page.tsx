"use client";
import { useEffect, useState } from "react";

export default function TodoList() {
    const [tasks, settasks] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/data")
            .then((res) => res.json())
            .then((data) => {
                settasks(data.tasks);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);
    console.log(tasks);
    if (loading) return <p>Loading Sophie's list...</p>;

    return (
        <div>
            <h1>To-Do List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.body} {task.done ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
