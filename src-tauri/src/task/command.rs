use crate::error::AppError;
use crate::task::dto::TaskDto;
use crate::task::service::TaskService;
use tauri::State;

#[tauri::command]
pub async fn get_tasks(service: State<'_, TaskService>) -> Result<Vec<TaskDto>, AppError> {
    let tasks = service.get_tasks().await?;
    Ok(tasks.into_iter().map(TaskDto::from).collect())
}

#[tauri::command]
pub async fn create_task(
    service: State<'_, TaskService>,
    text: String,
    pomodoro_total: i32,
) -> Result<(), AppError> {
    service.create_task(text, pomodoro_total as u32).await?;
    Ok(())
}
