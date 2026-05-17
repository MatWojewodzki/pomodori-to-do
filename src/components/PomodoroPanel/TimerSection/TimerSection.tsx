import { TimerType } from '../../../hooks/useTimerType.ts'
import TimerStateButton from './PomodoroStateButton.tsx'
import TimerControlButton from './TimerControlButton.tsx'
import { Timer } from '../../../hooks/useTimer.ts'

export type TimerSectionProps = {
  timer: Timer
}

function TimerSection(props: TimerSectionProps) {
  const { timer } = props
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
        <p className="text-9xl font-bold text-center">{formattedTime}</p>
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
