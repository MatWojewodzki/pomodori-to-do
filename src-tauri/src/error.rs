use thiserror::Error;

#[derive(Error, Debug)]
pub enum RepositoryError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
}

#[derive(Error, Debug)]
pub enum ValidationError {
    #[error("field '{0}' cannot be empty")]
    EmptyFieldNotAllowed(String),
}

#[derive(Error, Debug)]
pub enum ServiceError {
    #[error(transparent)]
    Repository(#[from] RepositoryError),

    #[error("Validation error: {0}")]
    Validation(#[from] ValidationError),
}

#[derive(Error, Debug)]
pub enum AppError {
    #[error(transparent)]
    Service(#[from] ServiceError),
}

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}
