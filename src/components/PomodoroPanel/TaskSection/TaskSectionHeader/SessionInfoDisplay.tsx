import { Timer } from '../../../../hooks/useTimer.ts'
import { TimerType } from '../../../../hooks/useTimerType.ts'
import getOrdinal from '../../../../utils/ordinal.ts'

type SessionInfoDisplayProps = {
  timer: Timer
}

function SessionInfoDisplay({ timer }: SessionInfoDisplayProps) {
  const isDuringWorkSession =
    timer.timerType === TimerType.WORK && timer.isRunning
  const pomodoroCount = isDuringWorkSession
    ? timer.pomodoroCount
    : timer.pomodoroCount - 1
  const ordinal = getOrdinal(pomodoroCount)

  const descriptionBeginning = isDuringWorkSession
    ? "You're at your "
    : "You've completed "
  const descriptionMiddle = isDuringWorkSession
    ? ordinal
    : pomodoroCount.toString()
  const descriptionEnd = isDuringWorkSession ? ' pomodoro' : ' pomodori'
  return (
    <div className="grow flex justify-around text-neutral-300">
      <span>
        {descriptionBeginning}
        <span className="text-white">{descriptionMiddle}</span>
        {descriptionEnd}
      </span>
    </div>
  )
}

export default SessionInfoDisplay
