"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import User from "../components/User";
import NewUserForm from "app/components/NewUserForm";

export interface UserObject {
    userid: number;
    username: string;
    useremail: string;
}

export default function TodoList() {
    const [users, setusers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setstatus] = useState("");

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
                    <User
                        userid={user.userid}
                        username={user.username}
                        useremail={user.useremail}
                    />
                ))}
            </ul>

            <div>
                <p>{status}</p>
            </div>
            <div>
                <NewUserForm />
            </div>
            <div>{status}</div>
            <Link href={`/TaskList`}>Click here for the nuTask List.</Link>
        </div>
    );
}
