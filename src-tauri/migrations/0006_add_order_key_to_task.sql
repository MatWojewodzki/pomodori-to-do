CREATE TABLE new_task (
                          id TEXT PRIMARY KEY,
                          text TEXT NOT NULL,
                          pomodoro_total INTEGER NOT NULL,
                          pomodoro_completed INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
                          order_key INTEGER NOT NULL DEFAULT 0
);

INSERT INTO new_task (id, text, pomodoro_total, pomodoro_completed, completed, order_key)
SELECT
    id,
    text,
    pomodoro_total,
    pomodoro_completed,
    completed,
    ROW_NUMBER() OVER (ORDER BY id) * 1000
FROM task;

DROP TABLE task;

ALTER TABLE new_task RENAME TO task;

CREATE INDEX idx_task_order_key ON task(order_key);
