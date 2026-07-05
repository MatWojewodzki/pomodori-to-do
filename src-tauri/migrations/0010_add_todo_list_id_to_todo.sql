ALTER TABLE todo
ADD COLUMN todo_list_id TEXT
DEFAULT '6f97a63d-d6a1-4a8c-9b45-f541eaeb00a2';

CREATE TABLE todo_new (
    id TEXT PRIMARY KEY,
    todo_list_id TEXT NOT NULL,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL CHECK (completed IN (0, 1)),
    order_key INTEGER NOT NULL,
    FOREIGN KEY (todo_list_id)
        REFERENCES todo_list(id)
        ON DELETE CASCADE
);

INSERT INTO todo_new (id, todo_list_id, text, completed, order_key)
SELECT id, todo_list_id, text, completed, order_key FROM todo;

DROP TABLE todo;

ALTER TABLE todo_new RENAME TO todo;

CREATE INDEX idx_todo_list_order
ON todo(todo_list_id, order_key);