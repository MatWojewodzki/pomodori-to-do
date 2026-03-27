use crate::error::ServiceError;
use crate::todo::domain::Todo;
use crate::todo::repository::TodoRepository;
use std::sync::Arc;

pub struct TodoService {
    todo_repository: Arc<dyn TodoRepository>,
}

impl TodoService {
    pub fn new(todo_repository: Arc<dyn TodoRepository>) -> Self {
        Self { todo_repository }
    }

    pub async fn get_todos(&self) -> Result<Vec<Todo>, ServiceError> {
        let todos = self.todo_repository.get_todos().await?;
        Ok(todos)
    }
    pub async fn create_todo(&self, text: String) -> Result<Todo, ServiceError> {
        let todo = Todo::new(text)?;
        let created = self.todo_repository.create_todo(todo).await?;
        Ok(created)
    }

    pub async fn delete_todo(&self, id: String) -> Result<(), ServiceError> {
        self.todo_repository.delete_todo(id).await?;
        Ok(())
    }
}
