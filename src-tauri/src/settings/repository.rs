pub mod sqlite;

use crate::error::RepositoryError;
use crate::settings::domain::Settings;
use async_trait::async_trait;

#[async_trait]
pub trait SettingsRepository: Send + Sync {
    async fn get_settings(&self) -> Result<Settings, RepositoryError>;
    async fn set_settings(&self, settings: Settings) -> Result<(), RepositoryError>;
}
