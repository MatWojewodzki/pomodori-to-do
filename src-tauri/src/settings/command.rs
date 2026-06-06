use crate::error::AppError;
use crate::settings::dto::SettingsDto;
use crate::settings::service::SettingsService;
use tauri::State;

#[tauri::command]
pub async fn get_settings(service: State<'_, SettingsService>) -> Result<SettingsDto, AppError> {
    let settings = service.get_settings().await?;
    Ok(SettingsDto::from(settings))
}

#[tauri::command]
pub async fn set_settings(
    service: State<'_, SettingsService>,
    settings: SettingsDto,
) -> Result<(), AppError> {
    service
        .set_settings(
            settings.work_duration,
            settings.short_break_duration,
            settings.long_break_duration,
            settings.pomodori_between_long_breaks,
            settings.notifications_enabled,
        )
        .await?;
    Ok(())
}
