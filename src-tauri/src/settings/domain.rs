pub struct Settings {
    pub work_duration: u32,
    pub short_break_duration: u32,
    pub long_break_duration: u32,
    pub pomodori_between_long_breaks: u32,
    pub notifications_enabled: bool,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            work_duration: 25 * 60,
            short_break_duration: 5 * 60,
            long_break_duration: 15 * 60,
            pomodori_between_long_breaks: 4,
            notifications_enabled: true,
        }
    }
}
