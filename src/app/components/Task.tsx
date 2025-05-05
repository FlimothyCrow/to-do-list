import styles from "./Task.module.scss";
import React, { useState } from "react";
import clsx from "clsx";

type TaskProps = {
    UUID: string;
    title: string;
    completed: boolean;
    onUpdateTask: (title: string) => void;
};

const Task: React.FC<TaskProps> = ({
    UUID,
    title,
    completed,
    onUpdateTask,
}) => {
    const [isChecked, setIsChecked] = useState(completed);

    const toggleCompleted = (
        e: React.ChangeEvent<HTMLInputElement>,
        identifier: string
    ) => {
        setIsChecked(e.target.checked);
        onUpdateTask(identifier);
        console.log("toggleCompleted has been called");
    };

    return (
        <div className={styles.taskContainer}>
            <label className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => toggleCompleted(e, UUID)}
                    className={styles.checkbox}
                />
            </label>
            <h2
                className={clsx(
                    styles.addTaskButton,
                    isChecked && styles.taskTitleCompleted
                )}
            >
                {title}
            </h2>
        </div>
    );
};

export default Task;
