use crate::error::ServiceError;
use crate::ordering;
use crate::ordering::{MoveAction, Position};
use crate::todo_list::domain::TodoList;
use crate::todo_list::repository::TodoListRepository;
use std::sync::Arc;

pub struct TodoListService {
    todo_list_repository: Arc<dyn TodoListRepository>,
}

impl TodoListService {
    pub fn new(todo_list_repository: Arc<dyn TodoListRepository>) -> Self {
        Self {
            todo_list_repository,
        }
    }

    pub async fn get_todo_lists(&self) -> Result<Vec<TodoList>, ServiceError> {
        let todo_lists = self.todo_list_repository.get_todo_lists().await?;
        Ok(todo_lists)
    }
    pub async fn create_todo_list(&self, title: String) -> Result<(), ServiceError> {
        let order_key =
            ordering::new_order_key(self.todo_list_repository.get_greatest_order_key().await?);
        let todo_list = TodoList::new(title, order_key)?;
        Ok(self
            .todo_list_repository
            .create_todo_list(todo_list)
            .await?)
    }

    pub async fn move_todo_list(
        &self,
        initial_index: u32,
        new_index: u32,
    ) -> Result<(), ServiceError> {
        if initial_index == new_index {
            return Ok(());
        }

        let todo_list = self
            .todo_list_repository
            .get_todo_list_by_index(initial_index)
            .await?;

        let gap_index = if initial_index < new_index {
            new_index + 1
        } else {
            new_index
        };
        let destination = match self.todo_list_repository.get_adjacent(gap_index).await? {
            (None, None) => return Ok(()),
            (None, Some(next)) => Position::Front { next },
            (Some(prev), None) => Position::Back { prev },
            (Some(prev), Some(next)) => Position::Between { prev, next },
        };

        let move_result = ordering::move_item(todo_list, destination);
        for move_action in move_result {
            match move_action {
                MoveAction::UpdateOne { id, new_order_key } => {
                    self.todo_list_repository
                        .update_order_key(id, new_order_key)
                        .await?
                }
                MoveAction::ShiftAfter {
                    order_key_to_shift_after,
                    delta,
                } => {
                    self.todo_list_repository
                        .shift_order_keys_greater_than(order_key_to_shift_after, delta)
                        .await?
                }
            }
        }
        Ok(())
    }

    pub async fn delete_todo_list(&self, id: String) -> Result<(), ServiceError> {
        self.todo_list_repository.delete_todo_list(id).await?;
        Ok(())
    }
}
