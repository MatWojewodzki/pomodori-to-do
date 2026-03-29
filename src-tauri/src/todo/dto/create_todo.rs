#[derive(serde::Deserialize, ts_rs::TS)]
#[ts(export)]
pub struct CreateTodoDto {
    pub text: String,
}
