use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("sqlx error: {0}")]
    SqlxGeneric(#[from] sqlx::Error),

    #[error("failed to {operation}: {source}")]
    SqlxOperation {
        operation: &'static str,
        source: sqlx::Error,
    },

    #[error("failed to run migrations: {0}")]
    SqlxMigration(#[from] sqlx::migrate::MigrateError),
}

#[derive(Error, Debug)]
pub enum ValidationError {
    #[error("field '{0}' cannot be empty")]
    EmptyFieldNotAllowed(String),
}

#[derive(Error, Debug)]
pub enum RepositoryError {
    #[error(transparent)]
    Database(#[from] DatabaseError),
}

impl From<sqlx::Error> for RepositoryError {
    fn from(error: sqlx::Error) -> Self {
        Self::Database(DatabaseError::from(error))
    }
}

#[derive(Error, Debug)]
pub enum ServiceError {
    #[error(transparent)]
    Repository(#[from] RepositoryError),

    #[error("validation error: {0}")]
    Validation(#[from] ValidationError),
}

#[derive(Error, Debug)]
pub enum StartupError {
    #[error("an IO error occurred: {0}")]
    IO(#[from] std::io::Error),

    #[error(transparent)]
    Database(#[from] DatabaseError),

    #[error("failed to initialize a repository: {0}")]
    Repository(#[from] RepositoryError),

    #[error("failed to start the application: {0}")]
    Other(String),
}

#[derive(Error, Debug)]
pub enum AppError {
    #[error(transparent)]
    Service(#[from] ServiceError),

    #[error(transparent)]
    Startup(#[from] StartupError),
}

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}
