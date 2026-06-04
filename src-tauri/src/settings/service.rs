use crate::error::ServiceError;
use crate::settings::domain::Settings;
use crate::settings::repository::SettingsRepository;
use std::sync::Arc;

pub struct SettingsService {
    task_repository: Arc<dyn SettingsRepository>,
}

impl SettingsService {
    pub fn new(task_repository: Arc<dyn SettingsRepository>) -> Self {
        Self { task_repository }
    }

    pub async fn get_settings(&self) -> Result<Settings, ServiceError> {
        Ok(self.task_repository.get_settings().await?)
    }

    pub async fn set_settings(
        &self,
        work_duration: u32,
        short_break_duration: u32,
        long_break_duration: u32,
        pomodori_between_long_breaks: u32,
        enable_notifications: bool,
    ) -> Result<(), ServiceError> {
        let settings = Settings {
            work_duration,
            short_break_duration,
            long_break_duration,
            pomodori_between_long_breaks,
            enable_notifications,
        };
        self.task_repository.set_settings(settings).await?;
        Ok(())
    }
}
