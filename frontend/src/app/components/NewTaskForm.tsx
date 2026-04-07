"use client";
import styles from "./NewTaskForm.module.scss";
import React, { useState } from "react";
import clsx from "clsx";

type NewTaskFormProps = {
    onAddTask: (title: string, date: number) => void;
};

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
    const [taskBody, settaskBody] = useState<string>("");

    const handleSubmit = (): void => {
        if (taskBody.trim() === "") return;
        onAddTask(taskBody.trim(), Date.now());
        console.log("sending taskBody ", taskBody, " to TaskList");
        settaskBody("");
    };

    return (
        <div className={styles.taskContainer}>
            <input
                type="text"
                value={taskBody}
                onChange={(e) => {
                    settaskBody(e.target.value);
                }}
                placeholder="Enter task title"
                className={styles.inputTask}
            />
            <button
                onClick={handleSubmit}
                className={clsx(
                    styles.addTaskButton,
                    taskBody.trim() === "" && styles.disabledTaskButton,
                )}
            >
                Add New Task
            </button>
        </div>
    );
};

export default NewTaskForm;
