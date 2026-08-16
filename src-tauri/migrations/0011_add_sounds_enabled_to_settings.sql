ALTER TABLE settings
ADD COLUMN sounds_enabled INTEGER NOT NULL CHECK (sounds_enabled IN (0, 1)) DEFAULT 1;