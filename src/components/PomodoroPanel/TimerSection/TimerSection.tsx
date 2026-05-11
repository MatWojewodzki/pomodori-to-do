import { useEffect, useRef, useState } from 'react'
import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
} from '@tauri-apps/plugin-notification'
import useTimerType, { TimerType } from '../../../hooks/useTimerType.ts'
import TimerStateButton from './PomodoroStateButton.tsx'
import TimerControlButton from './TimerControlButton.tsx'

const POMODORI_TO_LONG_BREAK = 4

const WORK_DURATION_S = 25
const SHORT_BREAK_DURATION_S = 5
const LONG_BREAK_DURATION_S = 15

function getDurationS(state: TimerType) {
    return state == TimerType.WORK
        ? WORK_DURATION_S
        : state == TimerType.SHORT_BREAK
          ? SHORT_BREAK_DURATION_S
          : LONG_BREAK_DURATION_S
}

function getOrdinal(n: number) {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}

async function showNotification(
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
        finishedState == TimerType.WORK
            ? 'Good job!'
            : 'Time to get back to work!'
    const body =
        finishedState == TimerType.WORK
            ? `You've just finished your ${getOrdinal(pomodoroCount)} pomodoro! ${isLongBreakNext ? 'You may take a longer break.' : 'Take a short break.'}`
            : ''
    sendNotification({ title, body })
}

function TimerSection() {
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

            showNotification(
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

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    return (
        <section className="flex justify-center">
            {' '}
            <div className="max-w-121 grow px-18 pt-12 pb-8 flex flex-col items-center gap-16 rounded-lg bg-neutral-600">
                <div
                    role="radiogroup"
                    aria-label="Pomodoro timer state"
                    className="flex w-full justify-between"
                >
                    <TimerStateButton
                        active={timerType == TimerType.WORK}
                        onClick={() => {
                            reset(TimerType.WORK)
                            setTimerType(TimerType.WORK)
                        }}
                    >
                        pomodoro
                    </TimerStateButton>
                    <TimerStateButton
                        active={timerType == TimerType.SHORT_BREAK}
                        onClick={() => {
                            reset(TimerType.SHORT_BREAK)
                            setTimerType(TimerType.SHORT_BREAK)
                        }}
                    >
                        short break
                    </TimerStateButton>
                    <TimerStateButton
                        active={timerType == TimerType.LONG_BREAK}
                        onClick={() => {
                            reset(TimerType.LONG_BREAK)
                            setTimerType(TimerType.LONG_BREAK)
                        }}
                    >
                        long break
                    </TimerStateButton>
                </div>
                <p className="text-9xl font-bold text-center">
                    {formattedTime}
                </p>
                <TimerControlButton
                    running={isRunning}
                    paused={isPaused}
                    secondsLeft={secondsLeft}
                    onClick={() => {
                        if (isRunning && isPaused) {
                            resume()
                        }
                        if (isRunning && !isPaused) {
                            pause()
                        }
                        if (!isRunning) {
                            start()
                        }
                    }}
                />
            </div>
        </section>
    )
}

export default TimerSection
