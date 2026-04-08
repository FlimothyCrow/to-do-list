"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import User from "../components/User";
import NewUserForm from "app/components/NewUserForm";
import styles from "./UserList.module.scss";

export interface UserObject {
    userid: number;
    username: string;
    useremail: string;
}

export default function TodoList() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userid, setUserid] = useState<number>(2);

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
                setUsers(data.users);
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
        <div className={styles.userListContainer}>
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
                <NewUserForm />
            </div>
            <Link href={`/TaskList/${userid}`}>View Tasks</Link>
        </div>
    );
}
