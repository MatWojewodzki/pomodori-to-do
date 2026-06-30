import { getNextState, TimerType } from '../hooks/useTimerType.ts'
import { TaskDto } from '../types/generated/TaskDto.ts'
import { getDurationS, Timer } from '../hooks/useTimer.ts'
import { SettingsDto } from '../types/generated/SettingsDto.ts'

function getSessionTimeLeft(
  tasks: TaskDto[],
  timer: Timer,
  settings: SettingsDto
) {
  const workSessionsRequired = tasks.reduce(
    (acc, item) =>
      item.completed
        ? acc
        : acc + Math.max(item.pomodoro_total - item.pomodoro_completed, 0),
    0
  )
  if (workSessionsRequired === 0) {
    return {
      finishTime: Date.now(),
      timeLeft: 0,
      pomodoriLeft: 0,
    }
  }

  // if the timer is running, set virtual state for the moment it finishes
  // if not, set to the current timer state
  let virtualTimerType = timer.isRunning
    ? getNextState(
        settings.pomodori_between_long_breaks,
        timer.timerType,
        timer.pomodoroCount,
        timer.lastPomodoroCountWithLongBreak
      )
    : timer.timerType
  let virtualPomodoroCount =
    timer.isRunning && timer.timerType === TimerType.WORK
      ? timer.pomodoroCount + 1
      : timer.pomodoroCount
  let virtualLastPomodoroCountWithLongBreak =
    timer.isRunning &&
    getNextState(
      settings.pomodori_between_long_breaks,
      timer.timerType,
      timer.pomodoroCount,
      timer.lastPomodoroCountWithLongBreak
    ) === TimerType.LONG_BREAK
      ? timer.pomodoroCount
      : timer.lastPomodoroCountWithLongBreak
  let virtuallyCompletedWorkSessions =
    timer.isRunning && timer.timerType === TimerType.WORK ? 1 : 0

  let finishTime = timer.endTime && !timer.isPaused ? timer.endTime : Date.now()

  while (virtuallyCompletedWorkSessions < workSessionsRequired) {
    finishTime +=
      getDurationS(
        settings.work_duration,
        settings.short_break_duration,
        settings.long_break_duration,
        virtualTimerType
      ) * 1000

    const nextVirtualTimerType = getNextState(
      settings.pomodori_between_long_breaks,
      virtualTimerType,
      virtualPomodoroCount,
      virtualLastPomodoroCountWithLongBreak
    )

    if (virtualTimerType === TimerType.LONG_BREAK) {
      virtualLastPomodoroCountWithLongBreak = virtualPomodoroCount
    }
    if (virtualTimerType === TimerType.WORK) {
      virtualPomodoroCount++
      virtuallyCompletedWorkSessions++
    }

    virtualTimerType = nextVirtualTimerType
  }

  return {
    finishTime,
    timeLeft: finishTime - Date.now(),
    pomodoriLeft: workSessionsRequired,
  }
}

export default getSessionTimeLeft
