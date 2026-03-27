use crate::error::ValidationError;
use uuid::Uuid;

pub struct Todo {
    pub id: String,
    pub text: String,
    pub completed: bool,
}

impl Todo {
    pub fn new(text: String) -> Result<Self, ValidationError> {
        let text = text.trim();

        if text.is_empty() {
            return Err(ValidationError::EmptyFieldNotAllowed("text".to_string()));
        }

        Ok(Self {
            id: Uuid::new_v4().to_string(),
            text: text.to_string(),
            completed: false,
        })
    }
}
