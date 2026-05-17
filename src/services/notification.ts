import { TimerType } from '../hooks/useTimerType.ts'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification'

function getOrdinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export async function showTimerNotification(
  finishedState: TimerType,
  pomodoroCount: number,
  isLongBreakNext: boolean
) {
  const permissionGranted = await isPermissionGranted()
  if (!permissionGranted) {
    const permission = await requestPermission()
    if (permission !== 'granted') {
      return
    }
  }
  const title =
    finishedState == TimerType.WORK ? 'Good job!' : 'Time to get back to work!'
  const body =
    finishedState == TimerType.WORK
      ? `You've just finished your ${getOrdinal(pomodoroCount)} pomodoro! ${isLongBreakNext ? 'You may take a longer break.' : 'Take a short break.'}`
      : ''
  sendNotification({ title, body })
}
