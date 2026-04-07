"use client";
import styles from "./NewTaskForm.module.scss";
import React, { useState } from "react";

const NewUserForm = ({}) => {
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState<string>("");
    const [useremail, setuseremail] = useState<string>("");

    const handleAddUser = async () => {
        setStatus("Sending user...");

        const response = await fetch("http://127.0.0.1:5000/api/insertuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                useremail: useremail,
            }),
        });

        if (response.ok) {
            setStatus("Success!");
        } else {
            setStatus("Error sending data.");
        }
        setUsername("");
        setuseremail("");
    };

    return (
        <div className={styles.taskContainer}>
            <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className={styles.inputTask}
            />
            <input
                type="useremail"
                value={useremail}
                onChange={(e) => setuseremail(e.target.value)}
                placeholder="Enter email"
                className={styles.inputTask}
            />
            <button onClick={handleAddUser}>Submit New User</button>
        </div>
    );
};

export default NewUserForm;
