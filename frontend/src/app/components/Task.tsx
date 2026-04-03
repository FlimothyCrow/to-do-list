import styles from "./Task.module.scss";
import React, { useState } from "react";
import clsx from "clsx";

type TaskProps = {
    taskid: number;
    taskbody: string;
    taskdone: boolean;
    taskdate: number;
    taskrecurring: boolean;
    userid: number;
};

const Task: React.FC<TaskProps> = ({
    taskid,
    taskbody,
    taskdone,
    taskdate,
    taskrecurring,
    userid,
}) => {
    const [isChecked, setIsChecked] = useState(taskdone);

    const toggleCompleted = (
        e: React.ChangeEvent<HTMLInputElement>,
        identifier: number,
    ) => {
        setIsChecked(e.target.checked);
    };

    return (
        <div className={styles.taskContainer}>
            <label className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => toggleCompleted(e, taskid)}
                    className={styles.checkbox}
                />
            </label>
            <h2
                className={clsx(
                    styles.addTaskButton,
                    isChecked && styles.taskdone,
                )}
            >
                {taskbody}
            </h2>
        </div>
    );
};

export default Task;
