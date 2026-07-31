#[derive(serde::Deserialize, ts_rs::TS)]
#[ts(export)]
pub struct CreateTodoDto {
    pub todo_list_id: String,
    pub text: String,
}
