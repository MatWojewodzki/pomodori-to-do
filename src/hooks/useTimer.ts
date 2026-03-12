import { useEffect, useRef, useState } from 'react'

function useTimer(duration_s: number) {
    const [endTime, setEndTime] = useState<number | null>(null)
    const [secondsLeft, setSecondsLeft] = useState(duration_s)
    const [pausedMsLeft, setPausedMsLeft] = useState<number | null>(null)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        if (!endTime || pausedMsLeft) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return
        }

        function updateTimeLeft() {
            if (!endTime || pausedMsLeft) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                return
            }
            const msLeft = endTime - Date.now()
            if (msLeft <= 0) {
                setEndTime(null)
                setSecondsLeft(0)
                if (intervalRef.current) clearInterval(intervalRef.current)
                return
            }
            const newSecondsLeft = Math.ceil(msLeft / 1000)
            if (newSecondsLeft !== secondsLeft) {
                setSecondsLeft(newSecondsLeft)
            }
        }
        intervalRef.current = window.setInterval(updateTimeLeft, 250)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [endTime, pausedMsLeft])

    function startTimer() {
        setEndTime(Date.now() + duration_s * 1000)
        setPausedMsLeft(null)
    }

    function pauseTimer() {
        if (!endTime) return
        setPausedMsLeft(endTime - Date.now())
    }

    function resumeTimer() {
        if (!pausedMsLeft) return
        setEndTime(Date.now() + pausedMsLeft)
        setPausedMsLeft(null)
    }

    function resetTimer() {
        setEndTime(null)
        setPausedMsLeft(null)
        setSecondsLeft(duration_s)
    }

    return {
        secondsLeft,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        isRunning: endTime !== null,
        isPaused: pausedMsLeft !== null,
    }
}

export default useTimer
