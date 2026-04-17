"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import User from "../components/User";
import NewUserForm from "app/components/NewUserForm";
import styles from "./UserList.module.scss";
import clsx from "clsx";

export interface UserObject {
    userid: number;
    username: string;
    useremail: string;
}

export default function TodoList() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userid, setUserid] = useState<number>();
    const [username, setUsername] = useState<string>();

    const chooseUser = (id: number, name: string) => {
        console.log("User ID:", id);
        setUserid(id);
        setUsername(name);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_users");

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

    return (
        <div className={styles.userListContainer}>
            <ul>
                {users.map((user) => (
                    <li
                        className={clsx(styles.user, {
                            [styles.selected]: userid === user.userid,
                        })}
                        onClick={() => chooseUser(user.userid, user.username)}
                        key={user.userid}
                    >
                        <User
                            userid={user.userid}
                            username={user.username}
                            useremail={user.useremail}
                        />
                    </li>
                ))}
            </ul>

            <div>
                <NewUserForm onAddUser={fetchUsers} />
            </div>
            <div
                className={clsx(styles.viewTasksBox, {
                    [styles.active]: userid,
                    [styles.disabled]: !userid,
                })}
            >
                <Link
                    className={styles.viewTasksLink}
                    href={`/TaskList/${userid}`}
                >
                    {userid ? `View ${username}'s Tasks` : "Choose a User"}
                </Link>
            </div>
        </div>
    );
}
