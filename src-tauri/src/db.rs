use sqlx::sqlite::{SqliteConnectOptions, SqlitePool, SqlitePoolOptions};
use std::str::FromStr;
use tauri::{App, Manager};

pub struct DbPools {
    pub writer: SqlitePool,
    pub reader: SqlitePool,
}

pub fn get_db_uri(app: &App) -> String {
    if cfg!(debug_assertions) {
        return "sqlite://database.dev.sqlite".to_string();
    }
    let db_path = app
        .path()
        .app_data_dir()
        .expect("failed to get app data dir")
        .join("database.sqlite");

    format!("sqlite:///{}", db_path.to_string_lossy())
}

pub async fn create_pool(url: &str) -> DbPools {
    let write_options = SqliteConnectOptions::from_str(url)
        .expect("Failed to parse db url")
        .create_if_missing(true);

    let read_options = SqliteConnectOptions::from_str(url)
        .expect("Failed to parse db url")
        .create_if_missing(true)
        .read_only(true);

    let write_pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(write_options)
        .await
        .expect("Failed to connect to db");

    let read_pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(read_options)
        .await
        .expect("Failed to connect to db");

    sqlx::migrate!()
        .run(&write_pool)
        .await
        .expect("Failed to run migrations");

    DbPools {
        writer: write_pool,
        reader: read_pool,
    }
}
