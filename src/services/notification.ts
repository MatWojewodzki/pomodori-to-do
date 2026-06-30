import { TimerType } from '../hooks/useTimerType.ts'
import { sendNotification } from '@tauri-apps/plugin-notification'
import getOrdinal from '../utils/ordinal.ts'

const notificationService = {
  sendTimerNotification: async (
    finishedState: TimerType,
    pomodoroCount: number,
    isLongBreakNext: boolean
  ) => {
    const title =
      finishedState == TimerType.WORK
        ? 'Good job!'
        : 'Time to get back to work!'
    const body =
      finishedState == TimerType.WORK
        ? `You've just finished your ${getOrdinal(pomodoroCount)} pomodoro! ${isLongBreakNext ? 'You may take a longer break.' : 'Take a short break.'}`
        : ''
    sendNotification({ title, body })
  },
}

export default notificationService
