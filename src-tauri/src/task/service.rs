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
}
