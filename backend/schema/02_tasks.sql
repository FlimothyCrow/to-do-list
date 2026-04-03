CREATE TABLE IF NOT EXISTS tasks
(
    taskid
            INTEGER PRIMARY KEY,
    taskbody
            TEXT    NOT NULL,
    taskdone
            INTEGER NOT NULL,
    taskdate
            INTEGER NOT NULL,
    taskrecurring
            INTEGER NOT NULL,
    userid INTEGER NOT NULL, -- This stores the ID of the user

    -- This creates the link:
    FOREIGN KEY (userid) REFERENCES users (userid)
);