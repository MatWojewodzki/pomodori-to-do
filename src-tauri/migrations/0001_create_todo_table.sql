CREATE TABLE IF NOT EXISTS todo (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL CHECK (completed IN (0, 1))
)