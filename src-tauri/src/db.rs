use crate::error::DatabaseError;
use crate::error::StartupError;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePool, SqlitePoolOptions};
use std::path::PathBuf;
use std::str::FromStr;

#[derive(Clone)]
pub struct DbPools {
    pub writer: SqlitePool,
    pub reader: SqlitePool,
}

pub fn get_db_uri(app_dir: PathBuf) -> String {
    if cfg!(debug_assertions) && cfg!(not(target_os = "android")) {
        return "sqlite://database.dev.sqlite".to_string();
    }
    let db_path = app_dir.join("database.sqlite");
    format!("sqlite:///{}", db_path.to_string_lossy())
}

pub async fn create_pool(url: &str) -> Result<DbPools, StartupError> {
    let write_options = SqliteConnectOptions::from_str(url)
        .map_err(|source| DatabaseError::SqlxOperation {
            operation: "parse the database url",
            source,
        })?
        .create_if_missing(true);

    let read_options = SqliteConnectOptions::from_str(url)
        .map_err(|source| DatabaseError::SqlxOperation {
            operation: "parse the database url",
            source,
        })?
        .read_only(true);

    let write_pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(write_options)
        .await
        .map_err(|source| DatabaseError::SqlxOperation {
            operation: "connect to the database",
            source,
        })?;

    let read_pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(read_options)
        .await
        .map_err(|source| DatabaseError::SqlxOperation {
            operation: "connect to the database",
            source,
        })?;

    sqlx::migrate!()
        .run(&write_pool)
        .await
        .map_err(DatabaseError::SqlxMigration)?;

    Ok(DbPools {
        writer: write_pool,
        reader: read_pool,
    })
}
