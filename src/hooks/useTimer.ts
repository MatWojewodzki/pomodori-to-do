import useTimerType, { TimerType } from './useTimerType.ts'
import { useEffect, useRef, useState } from 'react'
import useSessionStorage from './useSessionStorage.ts'
import useSettings from './../contexts/settings.tsx'

function getDurationS(
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  state: TimerType
) {
  return state == TimerType.WORK
    ? workDurationS
    : state == TimerType.SHORT_BREAK
      ? shortBreakDurationS
      : longBreakDurationS
}

function getInitialEndTime(pausedMsLeft: number | null) {
  if (pausedMsLeft) return Date.now() + pausedMsLeft
  return null
}

function getSecondsLeft(
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  timerType: TimerType,
  endTime: number | null
) {
  if (!endTime)
    return getDurationS(
      workDurationS,
      shortBreakDurationS,
      longBreakDurationS,
      timerType
    )
  const msLeft = endTime - Date.now()
  return Math.ceil(msLeft / 1000)
}

export type UseTimerOptions = {
  timerFinishCallback?: (
    prevState: TimerType,
    newState: TimerType,
    pomodoroCount: number
  ) => void
}

export default function useTimer({ timerFinishCallback }: UseTimerOptions) {
  const {
    work_duration: workDurationS,
    short_break_duration: shortBreakDurationS,
    long_break_duration: longBreakDurationS,
    pomodori_between_long_breaks: pomodoriBetweenLongBreaks,
  } = useSettings()

  const { timerType, setTimerType, setTimerTypeToNext } = useTimerType(
    TimerType.WORK,
    pomodoriBetweenLongBreaks
  )
  const [pausedMsLeft, setPausedMsLeft] = useSessionStorage<number | null>(
    'pausedMsLeft',
    null
  )
  const [pomodoroCount, setPomodoroCount] = useSessionStorage(
    'pomodoroCount',
    1
  )
  const durationS = getDurationS(
    workDurationS,
    shortBreakDurationS,
    longBreakDurationS,
    timerType
  )

  const initialEndTime = getInitialEndTime(pausedMsLeft)
  const [endTime, setEndTime] = useSessionStorage<number | null>(
    'endTime',
    initialEndTime,
    initialEndTime !== null
  )
  const [secondsLeft, setSecondsLeft] = useState(
    getSecondsLeft(
      workDurationS,
      shortBreakDurationS,
      longBreakDurationS,
      timerType,
      endTime
    )
  )
  const intervalRef = useRef<number | null>(null)

  function start() {
    setEndTime(Date.now() + durationS * 1000)
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
    setSecondsLeft(
      getDurationS(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        newState
      )
    )
  }

  useEffect(() => {
    if (endTime) return
    setSecondsLeft(
      getDurationS(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType
      )
    )
  }, [
    workDurationS,
    shortBreakDurationS,
    longBreakDurationS,
    endTime,
    setSecondsLeft,
    timerType,
  ])

  useEffect(() => {
    if (!endTime || pausedMsLeft) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    function handleFinish() {
      setEndTime(null)

      if (timerType == TimerType.WORK) {
        setPomodoroCount((val) => val + 1)
      }

      const newState = setTimerTypeToNext(pomodoroCount)
      const newDurationS = getDurationS(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        newState
      )
      setSecondsLeft(newDurationS)

      timerFinishCallback?.(timerType, newState, pomodoroCount)
    }

    function updateTimeLeft() {
      if (!endTime || pausedMsLeft) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }

      const newSecondsLeft = getSecondsLeft(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType,
        endTime
      )
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
    workDurationS,
    shortBreakDurationS,
    longBreakDurationS,
    endTime,
    pausedMsLeft,
    timerType,
    pomodoroCount,
    timerFinishCallback,
    setTimerTypeToNext,
  ])

  const isRunning = endTime !== null
  const isPaused = pausedMsLeft !== null

  const percentageCompleted = (1 - secondsLeft / durationS) * 100

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
