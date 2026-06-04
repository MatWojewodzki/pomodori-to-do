use crate::db::DbPools;
use crate::error::RepositoryError;
use crate::settings::domain::Settings;
use crate::settings::repository::SettingsRepository;
use async_trait::async_trait;
use sqlx::FromRow;

#[derive(FromRow)]
struct SettingsRow {
    work_duration: u32,
    short_break_duration: u32,
    long_break_duration: u32,
    pomodori_between_long_breaks: u32,
    notifications_enabled: i32,
}

pub struct SettingsRepositorySqlite {
    pools: DbPools,
}

impl SettingsRepositorySqlite {
    pub fn new(pools: DbPools) -> Self {
        Self { pools }
    }

    fn settings_to_row(settings: Settings) -> SettingsRow {
        SettingsRow {
            work_duration: settings.work_duration,
            short_break_duration: settings.short_break_duration,
            long_break_duration: settings.long_break_duration,
            pomodori_between_long_breaks: settings.pomodori_between_long_breaks,
            notifications_enabled: if settings.notifications_enabled { 1 } else { 0 },
        }
    }

    fn settings_from_row(row: SettingsRow) -> Settings {
        Settings {
            work_duration: row.work_duration,
            short_break_duration: row.short_break_duration,
            long_break_duration: row.long_break_duration,
            pomodori_between_long_breaks: row.pomodori_between_long_breaks,
            notifications_enabled: row.notifications_enabled != 0,
        }
    }

    pub async fn initialize(&self) -> Result<(), RepositoryError> {
        let id: Option<i64> = sqlx::query_scalar("SELECT id FROM settings WHERE id = 1")
            .fetch_optional(&self.pools.reader)
            .await?;

        if id.is_none() {
            let settings = Settings::default();
            let row = SettingsRepositorySqlite::settings_to_row(settings);
            let q = "\
            INSERT INTO settings (
                id,
                work_duration,
                short_break_duration,
                long_break_duration,
                pomodori_between_long_breaks,
                notifications_enabled)
            VALUES (1, ?, ?, ?, ?, ?)
            ";
            let query = sqlx::query(q)
                .bind(row.work_duration)
                .bind(row.short_break_duration)
                .bind(row.long_break_duration)
                .bind(row.pomodori_between_long_breaks)
                .bind(row.notifications_enabled);
            query.execute(&self.pools.writer).await?;
        }
        Ok(())
    }
}

#[async_trait]
impl SettingsRepository for SettingsRepositorySqlite {
    async fn get_settings(&self) -> Result<Settings, RepositoryError> {
        let q = "SELECT * FROM settings WHERE id = 1";
        let query = sqlx::query_as::<_, SettingsRow>(q);
        let row = query.fetch_one(&self.pools.reader).await?;
        Ok(SettingsRepositorySqlite::settings_from_row(row))
    }

    async fn set_settings(&self, settings: Settings) -> Result<(), RepositoryError> {
        let row = SettingsRepositorySqlite::settings_to_row(settings);
        let q = "
            UPDATE settings
            SET work_duration = ?,
                short_break_duration = ?,
                long_break_duration = ?,
                pomodori_between_long_breaks = ?,
                notifications_enabled = ?
            WHERE id = 1
        ";
        let query = sqlx::query(q)
            .bind(row.work_duration)
            .bind(row.short_break_duration)
            .bind(row.long_break_duration)
            .bind(row.pomodori_between_long_breaks)
            .bind(row.notifications_enabled);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }
}
