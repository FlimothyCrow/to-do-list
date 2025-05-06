"use client";
import styles from "./NewTaskForm.module.scss";
import React, { useState } from "react";
import clsx from "clsx";

type NewTaskFormProps = {
    onAddTask: (title: string, date: number) => void;
};

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState<string>("");

    const handleSubmit = (): void => {
        if (taskTitle.trim() === "") return;
        onAddTask(taskTitle.trim(), Date.now());
        setTaskTitle("");
    };

    return (
        <div className={styles.taskContainer}>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className={styles.inputTask}
            />
            <button
                onClick={handleSubmit}
                className={clsx(
                    styles.addTaskButton,
                    taskTitle.trim() === "" && styles.disabledTaskButton
                )}
            >
                Add New Task
            </button>
        </div>
    );
};

export default NewTaskForm;
