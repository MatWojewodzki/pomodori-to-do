mod db;
pub mod error;
pub mod task;
pub mod todo;

use crate::task::repository::sqlite::TaskRepositorySqlite;
use crate::task::service::TaskService;
use crate::todo::repository::sqlite::TodoRepositorySqlite;
use crate::todo::service::TodoService;
use std::path::PathBuf;
use std::sync::Arc;
use tauri::Manager;

fn setup_app_dir(app: &tauri::App) -> PathBuf {
    let app_dir = app.path().app_data_dir().unwrap();
    std::fs::create_dir_all(&app_dir).expect("failed to create app data directory");
    app_dir
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_dir = setup_app_dir(app);

            // setup database
            let db_uri = db::get_db_uri(app_dir);
            println!("db uri: {}", db_uri);
            let pools = tauri::async_runtime::block_on(db::create_pool(&db_uri));

            // setup repositories
            let todo_repository = Arc::new(TodoRepositorySqlite::new(pools.clone()));
            let task_repository = Arc::new(TaskRepositorySqlite::new(pools));

            // setup services
            let todo_service = TodoService::new(todo_repository);
            let task_service = TaskService::new(task_repository);

            app.manage(todo_service);
            app.manage(task_service);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            todo::command::get_todos,
            todo::command::create_todo,
            todo::command::delete_todo,
            todo::command::set_completed,
            task::command::get_tasks,
            task::command::create_task,
            task::command::update_task,
            task::command::delete_task,
            task::command::increment_pomodoro_completed,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
