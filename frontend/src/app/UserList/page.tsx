"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface UserObject {
    userid: number;
    username: string;
    useremail: string;
}

export default function TodoList() {
    const [users, setusers] = useState<any[]>([
        // {
        //     userid: 39,
        //     username: "Frenjamin",
        //     useremail: "frennieswithbennies@gmail.com",
        // },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/get_users",
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setusers(data.users);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    console.log(users);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.userid}>
                        <div>{user.username}</div>
                    </li>
                ))}
            </ul>
            <Link href={`/TaskList`}>Click here for the nuTask List.</Link>
        </div>
    );
}
