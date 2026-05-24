CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK ( id = 1 ),
    work_duration INTEGER NOT NULL,
    short_break_duration INTEGER NOT NULL,
    long_break_duration INTEGER NOT NULL,
    pomodori_between_long_breaks INTEGER NOT NULL
)