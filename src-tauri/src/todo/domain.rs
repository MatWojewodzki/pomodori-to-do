use crate::error::ValidationError;
use crate::ordering::Orderable;
use uuid::Uuid;

#[derive(Clone)]
pub struct Todo {
    pub id: String,
    pub text: String,
    pub completed: bool,
    pub order_key: i32,
}

impl Todo {
    pub fn new(text: String, order_key: i32) -> Result<Self, ValidationError> {
        let text = text.trim();

        if text.is_empty() {
            return Err(ValidationError::EmptyFieldNotAllowed("text".to_string()));
        }

        Ok(Self {
            id: Uuid::new_v4().to_string(),
            text: text.to_string(),
            completed: false,
            order_key,
        })
    }
}

impl Orderable for Todo {
    fn id(&self) -> &str {
        &self.id
    }

    fn order_key(&self) -> i32 {
        self.order_key
    }
}
