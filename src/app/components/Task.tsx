import React from "react";
import styles from "./Task.module.scss";

type TaskProps = {
    title: string;
};

const Task: React.FC<TaskProps> = ({ title }) => {
    return (
        <div className={styles.taskContainer}>
            <h2 className={styles.taskTitle}>{title}</h2>
        </div>
    );
};

export default Task;
