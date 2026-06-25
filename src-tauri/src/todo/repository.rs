use async_trait::async_trait;

pub mod sqlite;

use crate::error::RepositoryError;
use crate::todo::domain::Todo;

#[async_trait]
pub trait TodoRepository: Send + Sync {
    async fn get_todos(&self) -> Result<Vec<Todo>, RepositoryError>;
    async fn create_todo(&self, todo: Todo) -> Result<Todo, RepositoryError>;
    async fn delete_todo(&self, id: String) -> Result<(), RepositoryError>;
    async fn set_completed(&self, id: String, completed: bool) -> Result<(), RepositoryError>;
    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError>;
    async fn shift_order_keys_greater_than(
        &self,
        order_key: i32,
        delta: i32,
    ) -> Result<(), RepositoryError>;
    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError>;
    async fn get_todo(&self, index: u32) -> Result<Todo, RepositoryError>;
    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<Todo>, Option<Todo>), RepositoryError>;
}
