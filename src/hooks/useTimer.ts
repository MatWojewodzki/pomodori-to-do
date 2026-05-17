import useTimerType, { TimerType } from './useTimerType.ts'
import { useEffect, useRef, useState } from 'react'
import { showTimerNotification } from '../services/notification.ts'
import useSessionStorage from './useSessionStorage.ts'

const POMODORI_TO_LONG_BREAK = 4

const WORK_DURATION_S = 25 * 60
const SHORT_BREAK_DURATION_S = 5 * 60
const LONG_BREAK_DURATION_S = 15 * 60

function getDurationS(state: TimerType) {
  return state == TimerType.WORK
    ? WORK_DURATION_S
    : state == TimerType.SHORT_BREAK
      ? SHORT_BREAK_DURATION_S
      : LONG_BREAK_DURATION_S
}

function getInitialEndTime(pausedMsLeft: number | null) {
  if (pausedMsLeft) return Date.now() + pausedMsLeft
  return null
}

function getSecondsLeft(timerType: TimerType, endTime: number | null) {
  if (!endTime) return getDurationS(timerType)
  const msLeft = endTime - Date.now()
  return Math.ceil(msLeft / 1000)
}

export type UseTimerOptions = {
  workFinishCallback?: () => void
}

export default function useTimer(options?: UseTimerOptions) {
  const { timerType, setTimerType, setTimerTypeToNext } = useTimerType(
    TimerType.WORK,
    POMODORI_TO_LONG_BREAK
  )
  const [pausedMsLeft, setPausedMsLeft] = useSessionStorage<number | null>(
    'pausedMsLeft',
    null
  )
  const [pomodoroCount, setPomodoroCount] = useSessionStorage(
    'pomodoroCount',
    1
  )
  const duration_s = getDurationS(timerType)

  const initialEndTime = getInitialEndTime(pausedMsLeft)
  const [endTime, setEndTime] = useSessionStorage<number | null>(
    'endTime',
    initialEndTime,
    initialEndTime !== null
  )
  const [secondsLeft, setSecondsLeft] = useState(
    getSecondsLeft(timerType, endTime)
  )
  const intervalRef = useRef<number | null>(null)

  function start() {
    setEndTime(Date.now() + duration_s * 1000)
    setPausedMsLeft(null)
  }

  function pause() {
    if (!endTime) return
    setPausedMsLeft(endTime - Date.now())
  }

  function resume() {
    if (!pausedMsLeft) return
    setEndTime(Date.now() + pausedMsLeft)
    setPausedMsLeft(null)
  }

  function reset(newState: TimerType) {
    setEndTime(null)
    setPausedMsLeft(null)
    setSecondsLeft(getDurationS(newState))
  }

  useEffect(() => {
    if (!endTime || pausedMsLeft) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    function handleFinish() {
      setEndTime(null)

      if (timerType == TimerType.WORK) {
        setPomodoroCount((val) => val + 1)
        options?.workFinishCallback?.()
      }

      const newState = setTimerTypeToNext(pomodoroCount)
      const newDurationS = getDurationS(newState)
      setSecondsLeft(newDurationS)

      showTimerNotification(
        timerType,
        pomodoroCount,
        newState == TimerType.LONG_BREAK
      ).then()
    }

    function updateTimeLeft() {
      if (!endTime || pausedMsLeft) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }

      const newSecondsLeft = getSecondsLeft(timerType, endTime)
      if (newSecondsLeft <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        handleFinish()
        return
      }
      setSecondsLeft(newSecondsLeft)
    }
    intervalRef.current = window.setInterval(updateTimeLeft, 150)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [
    endTime,
    pausedMsLeft,
    timerType,
    pomodoroCount,
    options?.workFinishCallback,
    setTimerTypeToNext,
  ])

  const isRunning = endTime !== null
  const isPaused = pausedMsLeft !== null

  const percentageCompleted = (1 - secondsLeft / duration_s) * 100

  return {
    secondsLeft: Math.max(0, secondsLeft),
    isRunning,
    isPaused,
    percentageCompleted,
    timerType,
    setTimerType,
    start,
    pause,
    resume,
    reset,
  }
}

export type Timer = ReturnType<typeof useTimer>
