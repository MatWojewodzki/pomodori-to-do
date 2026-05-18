use crate::error::ServiceError;
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
        let task = Task::new(text, pomodoro_total)?;
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
        let task = Task {
            id,
            text,
            pomodoro_total,
            pomodoro_completed,
            completed,
        };
        Ok(self.task_repository.update_task(task).await?)
    }

    pub async fn delete_task(&self, id: String) -> Result<(), ServiceError> {
        Ok(self.task_repository.delete_task(id).await?)
    }

    pub async fn increment_pomodoro_completed(&self, id: String) -> Result<(), ServiceError> {
        self.task_repository
            .increment_pomodoro_completed(id.clone())
            .await?;
        let tasks = self.task_repository.get_tasks().await?;
        let task = tasks
            .into_iter()
            .find(|t| t.id == id)
            .expect("Task not found.");
        if task.pomodoro_completed >= task.pomodoro_total {
            self.task_repository.set_completed(id, true).await?;
        }
        Ok(())
    }

    pub async fn set_completed(&self, id: String, completed: bool) -> Result<(), ServiceError> {
        Ok(self.task_repository.set_completed(id, completed).await?)
    }
}
