use crate::error::AppError;
use crate::todo_list::dto::TodoListDto;
use crate::todo_list::service::TodoListService;
use tauri::State;

#[tauri::command]
pub async fn get_todo_lists(
    service: State<'_, TodoListService>,
) -> Result<Vec<TodoListDto>, AppError> {
    let todo_lists = service.get_todo_lists().await?;
    Ok(todo_lists.into_iter().map(TodoListDto::from).collect())
}

#[tauri::command]
pub async fn create_todo_list(
    service: State<'_, TodoListService>,
    title: String,
) -> Result<(), AppError> {
    service.create_todo_list(title).await?;
    Ok(())
}

#[tauri::command]
pub async fn move_todo_list(
    service: State<'_, TodoListService>,
    initial_index: u32,
    new_index: u32,
) -> Result<(), AppError> {
    service.move_todo_list(initial_index, new_index).await?;
    Ok(())
}
