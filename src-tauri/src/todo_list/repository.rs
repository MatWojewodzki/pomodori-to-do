pub mod sqlite;

use crate::error::RepositoryError;
use crate::todo_list::domain::TodoList;
use async_trait::async_trait;

#[async_trait]
pub trait TodoListRepository: Send + Sync {
    async fn get_todo_lists(&self) -> Result<Vec<TodoList>, RepositoryError>;
    async fn create_todo_list(&self, todo_list: TodoList) -> Result<(), RepositoryError>;
    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError>;
    async fn shift_order_keys_greater_than(
        &self,
        order_key: i32,
        delta: i32,
    ) -> Result<(), RepositoryError>;
    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError>;
    async fn get_todo_list_by_index(&self, index: u32) -> Result<TodoList, RepositoryError>;
    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<TodoList>, Option<TodoList>), RepositoryError>;
    async fn delete_todo_list(&self, id: String) -> Result<(), RepositoryError>;
}
