import styles from "./Task.module.scss";
import React, { useState } from "react";

type TaskProps = {
    userid: number;
    username: string;
    useremail: string;
};

const User: React.FC<TaskProps> = ({ username, useremail }) => {
    return (
        <div className={styles.taskContainer}>
            <div>Username: {username}</div>
            <div>Email: {useremail}</div>
        </div>
    );
};

export default User;
