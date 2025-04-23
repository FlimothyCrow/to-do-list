"use client";
import styles from "./NewTaskForm.module.scss";
import React, { useState } from "react";

type NewTaskFormProps = {
    onAddTask: (title: string) => void;
};

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState<string>("");

    const handleSubmit = (): void => {
        if (taskTitle.trim() === "") return;
        onAddTask(taskTitle.trim());
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
                className={styles.addTaskButton}
                disabled={taskTitle.trim() === ""}
            >
                Add New Task
            </button>
        </div>
    );
};

export default NewTaskForm;
