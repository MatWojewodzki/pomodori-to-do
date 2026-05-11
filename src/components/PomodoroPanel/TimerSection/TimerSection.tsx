import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
} from '@tauri-apps/plugin-notification'
import { TimerType } from '../../../hooks/useTimerType.ts'
import TimerStateButton from './PomodoroStateButton.tsx'
import TimerControlButton from './TimerControlButton.tsx'
import useTimer from '../../../hooks/useTimer.ts'

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
    const timer = useTimer({ showNotification })
    const minutes = Math.floor(timer.secondsLeft / 60)
    const seconds = timer.secondsLeft % 60
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
                        active={timer.timerType == TimerType.WORK}
                        onClick={() => {
                            timer.reset(TimerType.WORK)
                            timer.setTimerType(TimerType.WORK)
                        }}
                    >
                        pomodoro
                    </TimerStateButton>
                    <TimerStateButton
                        active={timer.timerType == TimerType.SHORT_BREAK}
                        onClick={() => {
                            timer.reset(TimerType.SHORT_BREAK)
                            timer.setTimerType(TimerType.SHORT_BREAK)
                        }}
                    >
                        short break
                    </TimerStateButton>
                    <TimerStateButton
                        active={timer.timerType == TimerType.LONG_BREAK}
                        onClick={() => {
                            timer.reset(TimerType.LONG_BREAK)
                            timer.setTimerType(TimerType.LONG_BREAK)
                        }}
                    >
                        long break
                    </TimerStateButton>
                </div>
                <p className="text-9xl font-bold text-center">
                    {formattedTime}
                </p>
                <TimerControlButton
                    running={timer.isRunning}
                    paused={timer.isPaused}
                    secondsLeft={timer.secondsLeft}
                    onClick={() => {
                        if (timer.isRunning && timer.isPaused) {
                            timer.resume()
                        }
                        if (timer.isRunning && !timer.isPaused) {
                            timer.pause()
                        }
                        if (!timer.isRunning) {
                            timer.start()
                        }
                    }}
                />
            </div>
        </section>
    )
}

export default TimerSection
