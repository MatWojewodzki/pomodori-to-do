import { useCallback } from 'react'
import useSessionStorage from './useSessionStorage.ts'

export enum TimerType {
  WORK,
  SHORT_BREAK,
  LONG_BREAK,
}

function getNextState(
  pomodoriToLongBreak: number,
  prevState: TimerType,
  completedPomodoroCount: number
) {
  return prevState == TimerType.SHORT_BREAK || prevState == TimerType.LONG_BREAK
    ? TimerType.WORK
    : completedPomodoroCount % pomodoriToLongBreak == 0
      ? TimerType.LONG_BREAK
      : TimerType.SHORT_BREAK
}

export default function useTimerType(
  initialValue: TimerType,
  pomodoriBetweenLongBreaks: number
) {
  const [timerType, setTimerType] = useSessionStorage<TimerType>(
    'timerType',
    initialValue
  )

  const setTimerTypeToNext = useCallback(
    (completedPomodoroCount: number) => {
      const nextState = getNextState(
        pomodoriBetweenLongBreaks,
        timerType,
        completedPomodoroCount
      )
      setTimerType(nextState)
      return nextState
    },
    [pomodoriBetweenLongBreaks, timerType]
  )

  return {
    timerType,
    setTimerType,
    setTimerTypeToNext,
  }
}
