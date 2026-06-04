import { useCallback } from 'react'
import useSessionStorage from './useSessionStorage.ts'

export enum TimerType {
  WORK,
  SHORT_BREAK,
  LONG_BREAK,
}

function getNextState(
  pomodoriBetweenLongBreaks: number,
  prevState: TimerType,
  completedPomodoroCount: number,
  lastPomodoroCountWithLongBreak: number
) {
  return prevState == TimerType.SHORT_BREAK || prevState == TimerType.LONG_BREAK
    ? TimerType.WORK
    : completedPomodoroCount - lastPomodoroCountWithLongBreak >=
        pomodoriBetweenLongBreaks
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
  const [lastPomodoroCountWithLongBreak, setLastPomodoroCountWithLongBreak] =
    useSessionStorage('lastPomodoroCountWithLongBreak', 0)

  const setTimerTypeToNext = useCallback(
    (completedPomodoroCount: number) => {
      const nextState = getNextState(
        pomodoriBetweenLongBreaks,
        timerType,
        completedPomodoroCount,
        lastPomodoroCountWithLongBreak
      )
      setTimerType(nextState)
      if (nextState == TimerType.LONG_BREAK) {
        setLastPomodoroCountWithLongBreak(completedPomodoroCount)
      }
      return nextState
    },
    [
      pomodoriBetweenLongBreaks,
      timerType,
      lastPomodoroCountWithLongBreak,
      setLastPomodoroCountWithLongBreak,
    ]
  )

  return {
    timerType,
    setTimerType,
    setTimerTypeToNext,
  }
}
