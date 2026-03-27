use async_trait::async_trait;

pub mod sqlite;

use crate::error::RepositoryError;
use crate::todo::domain::Todo;

#[async_trait]
pub trait TodoRepository: Send + Sync {
    async fn get_todos(&self) -> Result<Vec<Todo>, RepositoryError>;
    async fn create_todo(&self, todo: Todo) -> Result<Todo, RepositoryError>;
    async fn delete_todo(&self, id: String) -> Result<(), RepositoryError>;
}
