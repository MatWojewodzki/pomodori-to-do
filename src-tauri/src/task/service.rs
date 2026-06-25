use crate::error::ServiceError;
use crate::ordering;
use crate::ordering::{MoveAction, Position};
use crate::task::domain::Task;
use crate::task::repository::TaskRepository;
use std::sync::Arc;

pub struct TaskService {
    task_repository: Arc<dyn TaskRepository>,
}

impl TaskService {
    pub fn new(task_repository: Arc<dyn TaskRepository>) -> Self {
        Self { task_repository }
    }

    pub async fn get_tasks(&self) -> Result<Vec<Task>, ServiceError> {
        let tasks = self.task_repository.get_tasks().await?;
        Ok(tasks)
    }
    pub async fn create_task(&self, text: String, pomodoro_total: u32) -> Result<(), ServiceError> {
        let order_key =
            ordering::new_order_key(self.task_repository.get_greatest_order_key().await?);
        let task = Task::new(text, pomodoro_total, order_key)?;
        Ok(self.task_repository.create_task(task).await?)
    }

    pub async fn update_task(
        &self,
        id: String,
        text: String,
        pomodoro_total: u32,
        pomodoro_completed: u32,
        completed: bool,
    ) -> Result<(), ServiceError> {
        let prev_task = self.task_repository.get_task(id.clone()).await?;
        let task = Task {
            id: prev_task.id,
            text,
            pomodoro_total,
            pomodoro_completed,
            completed,
            order_key: prev_task.order_key,
        };
        self.task_repository.update_task(task).await?;
        self.update_task_completed(id).await?;
        Ok(())
    }

    pub async fn delete_task(&self, id: String) -> Result<(), ServiceError> {
        Ok(self.task_repository.delete_task(id).await?)
    }

    pub async fn increment_pomodoro_completed(&self, id: String) -> Result<(), ServiceError> {
        self.task_repository
            .increment_pomodoro_completed(id.clone())
            .await?;
        self.update_task_completed(id).await?;
        Ok(())
    }

    pub async fn set_task_completed(
        &self,
        id: String,
        completed: bool,
    ) -> Result<(), ServiceError> {
        Ok(self.task_repository.set_completed(id, completed).await?)
    }

    async fn update_task_completed(&self, id: String) -> Result<(), ServiceError> {
        let task = self.task_repository.get_task(id.clone()).await?;
        self.task_repository
            .set_completed(id, task.pomodoro_completed >= task.pomodoro_total)
            .await?;
        Ok(())
    }

    pub async fn move_task(&self, initial_index: u32, new_index: u32) -> Result<(), ServiceError> {
        if initial_index == new_index {
            return Ok(());
        }

        let todo = self
            .task_repository
            .get_task_by_index(initial_index)
            .await?;

        let gap_index = if initial_index < new_index {
            new_index + 1
        } else {
            new_index
        };
        let destination = match self.task_repository.get_adjacent(gap_index).await? {
            (None, None) => return Ok(()),
            (None, Some(next)) => Position::Front { next },
            (Some(prev), None) => Position::Back { prev },
            (Some(prev), Some(next)) => Position::Between { prev, next },
        };

        let move_result = ordering::move_item(todo, destination);
        for move_action in move_result {
            match move_action {
                MoveAction::UpdateOne { id, new_order_key } => {
                    self.task_repository
                        .update_order_key(id, new_order_key)
                        .await?
                }
                MoveAction::ShiftAfter {
                    order_key_to_shift_after,
                    delta,
                } => {
                    self.task_repository
                        .shift_order_keys_greater_than(order_key_to_shift_after, delta)
                        .await?
                }
            }
        }
        Ok(())
    }
}
