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

#[tauri::command]
pub async fn update_task(
    service: State<'_, TaskService>,
    updated_task: TaskDto,
) -> Result<(), AppError> {
    service
        .update_task(
            updated_task.id,
            updated_task.text,
            updated_task.pomodoro_total as u32,
            updated_task.pomodoro_completed as u32,
            updated_task.completed,
        )
        .await?;
    Ok(())
}

#[tauri::command]
pub async fn delete_task(service: State<'_, TaskService>, id: String) -> Result<(), AppError> {
    service.delete_task(id).await?;
    Ok(())
}

#[tauri::command]
pub async fn increment_pomodoro_completed(
    service: State<'_, TaskService>,
    id: String,
) -> Result<(), AppError> {
    service.increment_pomodoro_completed(id).await?;
    Ok(())
}

#[tauri::command]
pub async fn set_task_completed(
    service: State<'_, TaskService>,
    id: String,
    completed: bool,
) -> Result<(), AppError> {
    service.set_completed(id, completed).await?;
    Ok(())
}
