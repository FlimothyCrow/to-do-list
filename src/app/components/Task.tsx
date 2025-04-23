import styles from "./Task.module.scss";
import React, { useState } from "react";

type TaskProps = {
    title: string;
    completed: boolean;
};

const Task: React.FC<TaskProps> = ({ title, completed }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className={styles.taskContainer}>
            <label className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className={styles.checkbox}
                />
            </label>
            <h2 className={styles.taskTitle}>{title}</h2>
        </div>
    );
};

export default Task;
