CREATE TABLE IF NOT EXISTS task (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    pomodoro_total INTEGER NOT NULL,
    pomodoro_completed INTEGER NOT NULL
)