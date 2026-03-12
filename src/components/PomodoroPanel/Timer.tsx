import classNames from 'classnames'
import useTimer from '../../hooks/useTimer.ts'

function Timer() {
    const timer = useTimer(10)

    const minutes = Math.floor(timer.secondsLeft / 60)
    const seconds = timer.secondsLeft % 60

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    return (
        <div className="px-18 pt-12 pb-8 flex flex-col items-center gap-16 rounded-lg bg-neutral-600">
            <p className="text-9xl font-bold text-center">{formattedTime}</p>
            <button
                className={classNames(
                    'w-64 py-6 font-bold text-4xl cursor-pointer rounded-lg bg-white text-black'
                )}
                onClick={() => {
                    if (timer.isRunning && timer.isPaused) {
                        timer.resumeTimer()
                    }
                    if (timer.isRunning && !timer.isPaused) {
                        timer.pauseTimer()
                    }
                    if (!timer.isRunning && timer.secondsLeft == 0) {
                        timer.resetTimer()
                    }
                    if (!timer.isRunning && timer.secondsLeft !== 0) {
                        timer.startTimer()
                    }
                }}
            >
                {timer.isRunning
                    ? timer.isPaused
                        ? 'Resume'
                        : 'Pause'
                    : timer.secondsLeft === 0
                      ? 'Reset'
                      : 'Start'}
            </button>
        </div>
    )
}

export default Timer
