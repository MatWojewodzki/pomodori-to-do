use crate::task::domain::Task;

#[derive(serde::Serialize, serde::Deserialize, ts_rs::TS)]
#[ts(export)]
pub struct TaskDto {
    pub id: String,
    pub text: String,
    pub pomodoro_total: i32,
    pub pomodoro_completed: i32,
}

impl From<Task> for TaskDto {
    fn from(task: Task) -> Self {
        TaskDto {
            id: task.id,
            text: task.text,
            pomodoro_total: task.pomodoro_total as i32,
            pomodoro_completed: task.pomodoro_completed as i32,
        }
    }
}
