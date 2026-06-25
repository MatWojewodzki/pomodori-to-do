use crate::error::ServiceError;
use crate::ordering;
use crate::ordering::{MoveAction, Position};
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
        let order_key =
            ordering::new_order_key(self.todo_repository.get_greatest_order_key().await?);
        let todo = Todo::new(text, order_key)?;
        let created = self.todo_repository.create_todo(todo).await?;
        Ok(created)
    }

    pub async fn delete_todo(&self, id: String) -> Result<(), ServiceError> {
        self.todo_repository.delete_todo(id).await?;
        Ok(())
    }

    pub async fn set_completed(&self, id: String, completed: bool) -> Result<(), ServiceError> {
        self.todo_repository.set_completed(id, completed).await?;
        Ok(())
    }
    pub async fn move_todo(&self, initial_index: u32, new_index: u32) -> Result<(), ServiceError> {
        if initial_index == new_index {
            return Ok(());
        }

        let todo = self.todo_repository.get_todo(initial_index).await?;

        let gap_index = if initial_index < new_index {
            new_index + 1
        } else {
            new_index
        };
        let destination = match self.todo_repository.get_adjacent(gap_index).await? {
            (None, None) => return Ok(()),
            (None, Some(next)) => Position::Front { next },
            (Some(prev), None) => Position::Back { prev },
            (Some(prev), Some(next)) => Position::Between { prev, next },
        };

        let move_result = ordering::move_item(todo, destination);
        for move_action in move_result {
            match move_action {
                MoveAction::UpdateOne { id, new_order_key } => {
                    self.todo_repository
                        .update_order_key(id, new_order_key)
                        .await?
                }
                MoveAction::ShiftAfter {
                    order_key_to_shift_after,
                    delta,
                } => {
                    self.todo_repository
                        .shift_order_keys_greater_than(order_key_to_shift_after, delta)
                        .await?
                }
            }
        }
        Ok(())
    }
}
