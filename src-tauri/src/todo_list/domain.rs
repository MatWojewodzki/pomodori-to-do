use crate::error::ValidationError;
use crate::ordering::Orderable;
use uuid::Uuid;

#[derive(Clone)]
pub struct TodoList {
    pub id: String,
    pub title: String,
    pub order_key: i32,
}

impl TodoList {
    pub fn new(title: String, order_key: i32) -> Result<Self, ValidationError> {
        let title = title.trim();

        if title.is_empty() {
            return Err(ValidationError::EmptyFieldNotAllowed("title".to_string()));
        }

        Ok(Self {
            id: Uuid::new_v4().to_string(),
            title: title.to_string(),
            order_key,
        })
    }
}

impl Orderable for TodoList {
    fn id(&self) -> &str {
        &self.id
    }

    fn order_key(&self) -> i32 {
        self.order_key
    }
}
