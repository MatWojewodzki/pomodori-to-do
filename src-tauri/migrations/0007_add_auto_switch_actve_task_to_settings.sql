ALTER TABLE settings
ADD COLUMN auto_switch_active_task INTEGER NOT NULL CHECK (auto_switch_active_task IN (0, 1)) DEFAULT 1;