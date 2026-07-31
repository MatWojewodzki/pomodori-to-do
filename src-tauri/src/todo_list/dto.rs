pub mod update;

use crate::todo_list::domain::TodoList;

#[derive(serde::Serialize, ts_rs::TS)]
#[ts(export)]
pub struct TodoListDto {
    pub id: String,
    pub title: String,
}

impl From<TodoList> for TodoListDto {
    fn from(todo_list: TodoList) -> Self {
        Self {
            id: todo_list.id,
            title: todo_list.title,
        }
    }
}
