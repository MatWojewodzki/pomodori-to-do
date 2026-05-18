pub mod sqlite;

use crate::error::RepositoryError;
use crate::task::domain::Task;
use async_trait::async_trait;

#[async_trait]
pub trait TaskRepository: Send + Sync {
    async fn get_tasks(&self) -> Result<Vec<Task>, RepositoryError>;
    async fn create_task(&self, task: Task) -> Result<(), RepositoryError>;
    async fn update_task(&self, updated_task: Task) -> Result<(), RepositoryError>;
    async fn delete_task(&self, id: String) -> Result<(), RepositoryError>;
    async fn increment_pomodoro_completed(&self, id: String) -> Result<(), RepositoryError>;
    async fn set_completed(&self, id: String, completed: bool) -> Result<(), RepositoryError>;
}
