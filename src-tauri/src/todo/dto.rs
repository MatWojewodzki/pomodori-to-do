use crate::todo::domain::Todo;

pub mod create_todo;

#[derive(serde::Serialize, ts_rs::TS)]
#[ts(export)]
pub struct TodoDto {
    pub id: String,
    pub text: String,
    pub completed: bool,
}

impl From<Todo> for TodoDto {
    fn from(todo: Todo) -> Self {
        TodoDto {
            id: todo.id,
            text: todo.text,
            completed: todo.completed,
        }
    }
}
