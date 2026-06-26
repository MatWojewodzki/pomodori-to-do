import { useCallback, useRef } from 'react'
import { TimerType } from './useTimerType.ts'

export type TimerFinishCallback = (
  prevState: TimerType,
  newState: TimerType,
  pomodoroCount: number
) => void

function useTimerFinish() {
  const callbacks = useRef(new Set<TimerFinishCallback>())

  const onTimerFinish = useCallback((callback: TimerFinishCallback) => {
    callbacks.current.add(callback)
    return () => {
      callbacks.current.delete(callback)
      return
    }
  }, [])

  const handleTimerFinish = useCallback(
    (prevState: TimerType, newState: TimerType, pomodoroCount: number) =>
      callbacks.current.forEach((callback) =>
        callback(prevState, newState, pomodoroCount)
      ),
    []
  )

  return {
    onTimerFinish,
    handleTimerFinish,
  }
}

export default useTimerFinish
