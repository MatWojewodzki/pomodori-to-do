use crate::error::ValidationError;
use uuid::Uuid;

pub struct Task {
    pub id: String,
    pub text: String,
    pub pomodoro_total: u32,
    pub pomodoro_completed: u32,
    pub completed: bool,
}

impl Task {
    pub fn new(text: String, pomodoro_total: u32) -> Result<Self, ValidationError> {
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
        })
    }
}
