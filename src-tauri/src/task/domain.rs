use crate::error::ValidationError;
use crate::ordering::Orderable;
use uuid::Uuid;

#[derive(Clone)]
pub struct Task {
    pub id: String,
    pub text: String,
    pub pomodoro_total: u32,
    pub pomodoro_completed: u32,
    pub completed: bool,
    pub order_key: i32,
}

impl Task {
    pub fn new(text: String, pomodoro_total: u32, order_key: i32) -> Result<Self, ValidationError> {
        let text = text.trim();

        if text.is_empty() {
            return Err(ValidationError::EmptyFieldNotAllowed("text".to_string()));
        }

        Ok(Self {
            id: Uuid::new_v4().to_string(),
            text: text.to_string(),
            pomodoro_total,
            pomodoro_completed: 0,
            completed: false,
            order_key,
        })
    }
}

impl Orderable for Task {
    fn id(&self) -> &str {
        &self.id
    }

    fn order_key(&self) -> i32 {
        self.order_key
    }
}
