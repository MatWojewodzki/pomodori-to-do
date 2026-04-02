import PomodoroStateButton from './PomodoroStateButton.tsx'
import { useEffect, useRef, useState } from 'react'
import TimerControlButton from './TimerControlButton.tsx'

const POMODORI_TO_LONG_BREAK = 4

const WORK_DURATION_S = 25 * 60
const SHORT_BREAK_DURATION_S = 5 * 60
const LONG_BREAK_DURATION_S = 15 * 60

enum PomodoroState {
    WORK,
    SHORT_BREAK,
    LONG_BREAK,
}

function getNextState(prevState: PomodoroState, prevPomodoroCount: number) {
    return prevState == PomodoroState.SHORT_BREAK ||
        prevState == PomodoroState.LONG_BREAK
        ? PomodoroState.WORK
        : prevPomodoroCount % POMODORI_TO_LONG_BREAK == 0
          ? PomodoroState.LONG_BREAK
          : PomodoroState.SHORT_BREAK
}

function getDurationS(state: PomodoroState) {
    return state == PomodoroState.WORK
        ? WORK_DURATION_S
        : state == PomodoroState.SHORT_BREAK
          ? SHORT_BREAK_DURATION_S
          : LONG_BREAK_DURATION_S
}

function Timer() {
    const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
        PomodoroState.WORK
    )
    const [pomodoroCount, setPomodoroCount] = useState(1)
    const duration_s = getDurationS(pomodoroState)

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

    function reset(newState: PomodoroState) {
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

            const newState = getNextState(pomodoroState, pomodoroCount)
            const newDurationS = getDurationS(newState)
            setSecondsLeft(newDurationS)

            if (pomodoroState == PomodoroState.WORK) {
                setPomodoroCount(pomodoroCount + 1)
            }
            setPomodoroState(newState)
        }

        function updateTimeLeft() {
            console.log('tick')
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
    }, [endTime, pausedMsLeft, pomodoroState, pomodoroCount])

    const isRunning = endTime !== null
    const isPaused = pausedMsLeft !== null

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    return (
        <div className="flex justify-center">
            {' '}
            <div className="px-18 pt-12 pb-8 flex flex-col items-center gap-16 rounded-lg bg-neutral-600">
                <div
                    role="radiogroup"
                    aria-label="Pomodoro timer state"
                    className="flex w-full justify-between"
                >
                    <PomodoroStateButton
                        active={pomodoroState == PomodoroState.WORK}
                        onClick={() => {
                            reset(PomodoroState.WORK)
                            setPomodoroState(PomodoroState.WORK)
                        }}
                    >
                        pomodoro
                    </PomodoroStateButton>
                    <PomodoroStateButton
                        active={pomodoroState == PomodoroState.SHORT_BREAK}
                        onClick={() => {
                            reset(PomodoroState.SHORT_BREAK)
                            setPomodoroState(PomodoroState.SHORT_BREAK)
                        }}
                    >
                        short break
                    </PomodoroStateButton>
                    <PomodoroStateButton
                        active={pomodoroState == PomodoroState.LONG_BREAK}
                        onClick={() => {
                            reset(PomodoroState.LONG_BREAK)
                            setPomodoroState(PomodoroState.LONG_BREAK)
                        }}
                    >
                        long break
                    </PomodoroStateButton>
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
        </div>
    )
}

export default Timer
