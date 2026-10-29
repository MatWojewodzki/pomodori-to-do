// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use pomodori_to_do_lib::error::AppError;

fn main() -> Result<(), AppError> {
    pomodori_to_do_lib::run()
}
