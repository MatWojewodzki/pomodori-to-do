pub mod sqlite;

use crate::error::RepositoryError;
use crate::task::domain::Task;
use async_trait::async_trait;

#[async_trait]
pub trait TaskRepository: Send + Sync {
    async fn get_task(&self, id: String) -> Result<Task, RepositoryError>;
    async fn get_tasks(&self) -> Result<Vec<Task>, RepositoryError>;
    async fn create_task(&self, task: Task) -> Result<(), RepositoryError>;
    async fn update_task(&self, updated_task: Task) -> Result<(), RepositoryError>;
    async fn delete_task(&self, id: String) -> Result<(), RepositoryError>;
    async fn increment_pomodoro_completed(&self, id: String) -> Result<(), RepositoryError>;
    async fn set_completed(&self, id: String, completed: bool) -> Result<(), RepositoryError>;
    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError>;
    async fn shift_order_keys_greater_than(
        &self,
        order_key: i32,
        delta: i32,
    ) -> Result<(), RepositoryError>;
    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError>;
    async fn get_task_by_index(&self, index: u32) -> Result<Task, RepositoryError>;
    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<Task>, Option<Task>), RepositoryError>;
}
