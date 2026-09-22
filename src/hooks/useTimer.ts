import useTimerType, { TimerType } from './useTimerType.ts'
import { useEffect, useRef, useState } from 'react'
import useSettings from './../contexts/settings.tsx'
import useTimerFinish from './useTimerFinish.ts'
import { useSessionStorage } from 'usehooks-ts'

export function getDurationS(
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

function getDurationMs(
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  state: TimerType
) {
  return (
    getDurationS(
      workDurationS,
      shortBreakDurationS,
      longBreakDurationS,
      state
    ) * 1000
  )
}

function getMsLeft(
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  timerType: TimerType,
  startTimestamp: number | null
) {
  const durationMs = getDurationMs(
    workDurationS,
    shortBreakDurationS,
    longBreakDurationS,
    timerType
  )

  if (!startTimestamp) return durationMs

  return durationMs - (Date.now() - startTimestamp)
}

function getSecondsLeft(
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  timerType: TimerType,
  startTimestamp: number | null
) {
  return Math.ceil(
    getMsLeft(
      workDurationS,
      shortBreakDurationS,
      longBreakDurationS,
      timerType,
      startTimestamp
    ) / 1000
  )
}

function getInitialStartTimestamp(
  pausedMsLeft: number | null,
  workDurationS: number,
  shortBreakDurationS: number,
  longBreakDurationS: number,
  timerType: TimerType
) {
  return pausedMsLeft
    ? Date.now() -
        (getDurationMs(
          workDurationS,
          shortBreakDurationS,
          longBreakDurationS,
          timerType
        ) -
          pausedMsLeft)
    : null
}

export default function useTimer() {
  const {
    work_duration: workDurationS,
    short_break_duration: shortBreakDurationS,
    long_break_duration: longBreakDurationS,
    pomodori_between_long_breaks: pomodoriBetweenLongBreaks,
  } = useSettings()

  const {
    timerType,
    lastPomodoroCountWithLongBreak,
    setTimerType,
    setTimerTypeToNext,
  } = useTimerType(TimerType.WORK, pomodoriBetweenLongBreaks)

  const [pausedMsLeft, setPausedMsLeft] = useSessionStorage<number | null>(
    'pausedMsLeft',
    null
  )

  const initialStartTimestamp = getInitialStartTimestamp(
    pausedMsLeft,
    workDurationS,
    shortBreakDurationS,
    longBreakDurationS,
    timerType
  )
  const [startTimestamp, setStartTimestamp] = useSessionStorage<number | null>(
    'startTimestamp',
    initialStartTimestamp,
    { initializeWithValue: initialStartTimestamp === null }
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

  const [secondsLeft, setSecondsLeft] = useState(
    getSecondsLeft(
      workDurationS,
      shortBreakDurationS,
      longBreakDurationS,
      timerType,
      startTimestamp
    )
  )

  const { onTimerFinish, handleTimerFinish } = useTimerFinish()

  const intervalRef = useRef<number | null>(null)

  function start() {
    setStartTimestamp(Date.now())
    setPausedMsLeft(null)
  }

  function pause() {
    if (!startTimestamp) return
    setPausedMsLeft(
      getMsLeft(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType,
        startTimestamp
      )
    )
  }

  function resume() {
    if (!pausedMsLeft) return
    console.log(workDurationS)
    setStartTimestamp(
      getInitialStartTimestamp(
        pausedMsLeft,
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType
      )
    )
    setPausedMsLeft(null)
  }

  function reset(newState: TimerType) {
    setStartTimestamp(null)
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

  // useEffect(() => {
  //   if (endTime) return
  //   setSecondsLeft(
  //     getDurationS(
  //       workDurationS,
  //       shortBreakDurationS,
  //       longBreakDurationS,
  //       timerType
  //     )
  //   )
  // }, [
  //   workDurationS,
  //   shortBreakDurationS,
  //   longBreakDurationS,
  //   endTime,
  //   setSecondsLeft,
  //   timerType,
  // ])

  useEffect(() => {
    if (!startTimestamp || pausedMsLeft) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    function handleFinish() {
      setStartTimestamp(null)

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

      handleTimerFinish(timerType, newState, pomodoroCount)
    }

    function updateTimeLeft() {
      if (!startTimestamp || pausedMsLeft) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }

      const newSecondsLeft = getSecondsLeft(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType,
        startTimestamp
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
    startTimestamp,
    pausedMsLeft,
    timerType,
    pomodoroCount,
    handleTimerFinish,
    setTimerTypeToNext,
  ])

  const finishTimestamp = startTimestamp
    ? startTimestamp +
      getDurationMs(
        workDurationS,
        shortBreakDurationS,
        longBreakDurationS,
        timerType
      )
    : null

  const isRunning = startTimestamp !== null
  const isPaused = pausedMsLeft !== null

  const percentageCompleted = (1 - secondsLeft / durationS) * 100

  return {
    secondsLeft: Math.max(0, secondsLeft),
    isRunning,
    isPaused,
    percentageCompleted,
    timerType,
    pomodoroCount,
    startTimestamp,
    finishTimestamp,
    lastPomodoroCountWithLongBreak,
    setTimerType,
    start,
    pause,
    resume,
    reset,
    onTimerFinish,
  }
}

export type Timer = ReturnType<typeof useTimer>
