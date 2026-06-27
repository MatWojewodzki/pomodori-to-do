import { TimerType } from './useTimerType.ts'
import { Timer } from './useTimer.ts'
import { TaskDto } from '../types/generated/TaskDto.ts'

function useTaskProgress(task: TaskDto, timer: Timer, isActive: boolean) {
  const standardProgress = (task.pomodoro_completed / task.pomodoro_total) * 100
  const timerProgress =
    standardProgress + timer.percentageCompleted / task.pomodoro_total

  return isActive && timer.isRunning && timer.timerType == TimerType.WORK
    ? timerProgress
    : standardProgress
}

export default useTaskProgress
