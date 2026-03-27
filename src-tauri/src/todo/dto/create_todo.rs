#[derive(serde::Deserialize)]
pub struct CreateTodoDto {
    pub text: String,
}
