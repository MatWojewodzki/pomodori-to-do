use crate::error::AppError;
use crate::todo::dto::create_todo::CreateTodoDto;
use crate::todo::dto::TodoDto;
use crate::todo::service::TodoService;
use tauri::State;

#[tauri::command]
pub async fn get_todos(service: State<'_, TodoService>) -> Result<Vec<TodoDto>, AppError> {
    let todos = service.get_todos().await?;
    Ok(todos.into_iter().map(TodoDto::from).collect())
}

#[tauri::command]
pub async fn create_todo(
    service: State<'_, TodoService>,
    create_todo: CreateTodoDto,
) -> Result<TodoDto, AppError> {
    let created = service.create_todo(create_todo.text).await?;
    Ok(created.into())
}

#[tauri::command]
pub async fn delete_todo(service: State<'_, TodoService>, id: String) -> Result<(), AppError> {
    service.delete_todo(id).await?;
    Ok(())
}
