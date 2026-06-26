use crate::settings::domain::Settings;

#[derive(serde::Serialize, serde::Deserialize, ts_rs::TS)]
#[ts(export)]
pub struct SettingsDto {
    pub work_duration: u32,
    pub short_break_duration: u32,
    pub long_break_duration: u32,
    pub pomodori_between_long_breaks: u32,
    pub notifications_enabled: bool,
    pub auto_switch_active_task: bool,
}

impl From<Settings> for SettingsDto {
    fn from(value: Settings) -> Self {
        Self {
            work_duration: value.work_duration,
            short_break_duration: value.short_break_duration,
            long_break_duration: value.long_break_duration,
            pomodori_between_long_breaks: value.pomodori_between_long_breaks,
            notifications_enabled: value.notifications_enabled,
            auto_switch_active_task: value.auto_switch_active_task,
        }
    }
}
