import useTimerType, { TimerType } from './useTimerType.ts'
import { useEffect, useRef, useState } from 'react'
import { showTimerNotification } from '../services/notifications.ts'

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

export default function useTimer() {
    const { timerType, setTimerType, setTimerTypeToNext } = useTimerType(
        TimerType.WORK,
        POMODORI_TO_LONG_BREAK
    )
    const [pomodoroCount, setPomodoroCount] = useState(1)
    const duration_s = getDurationS(timerType)

    const [endTime, setEndTime] = useState<number | null>(null)
    const [secondsLeft, setSecondsLeft] = useState(duration_s)
    const [pausedMsLeft, setPausedMsLeft] = useState<number | null>(null)
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
            if (intervalRef.current) clearInterval(intervalRef.current)

            if (timerType == TimerType.WORK) {
                setPomodoroCount(pomodoroCount + 1)
            }

            const newState = setTimerTypeToNext(pomodoroCount)
            const newDurationS = getDurationS(newState)

            showTimerNotification(
                timerType,
                pomodoroCount,
                newState == TimerType.LONG_BREAK
            ).then()

            setSecondsLeft(newDurationS)
        }

        function updateTimeLeft() {
            if (!endTime || pausedMsLeft) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                return
            }
            const msLeft = endTime - Date.now()
            if (msLeft <= 0) {
                handleFinish()
                return
            }
            const newSecondsLeft = Math.ceil(msLeft / 1000)
            if (newSecondsLeft !== secondsLeft) {
                setSecondsLeft(newSecondsLeft)
            }
        }
        intervalRef.current = window.setInterval(updateTimeLeft, 150)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [endTime, pausedMsLeft, timerType, pomodoroCount])

    const isRunning = endTime !== null
    const isPaused = pausedMsLeft !== null

    return {
        secondsLeft,
        isRunning,
        isPaused,
        timerType,
        setTimerType,
        start,
        pause,
        resume,
        reset,
    }
}
