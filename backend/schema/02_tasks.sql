CREATE TABLE IF NOT EXISTS tasks
(
    taskid
            INTEGER
        PRIMARY
            KEY
        AUTOINCREMENT,
    taskbody
            TEXT    NOT NULL,
    taskdone
            INTEGER NOT NULL,
    taskdate
            INTEGER NOT NULL,
    taskrecurring
            INTEGER NOT NULL,
    user_id INTEGER NOT NULL, -- This stores the ID of the user

    -- This creates the link:
    FOREIGN KEY (user_id) REFERENCES users (userid)
);