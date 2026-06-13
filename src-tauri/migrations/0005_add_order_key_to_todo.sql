CREATE TABLE new_todo (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL CHECK (completed IN (0, 1)),
    order_key INTEGER NOT NULL DEFAULT 0
);

INSERT INTO new_todo (id, text, completed, order_key)
SELECT
    id,
    text,
    completed,
    ROW_NUMBER() OVER (ORDER BY id) * 1000
FROM todo;

DROP TABLE todo;

ALTER TABLE new_todo RENAME TO todo;

CREATE INDEX idx_todo_order_key ON todo(order_key);