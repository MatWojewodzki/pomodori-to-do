import { Timer } from '../../../hooks/useTimer.ts'
import classNames from 'classnames'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import getTimeLeft from '../../../utils/getSessionTimeLeft.ts'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSettings from '../../../contexts/settings.tsx'

type SessionTimeLeftDisplayProps = {
  tasks: TaskDto[]
  timer: Timer
}

function SessionTimeLeftDisplay({ tasks, timer }: SessionTimeLeftDisplayProps) {
  const settings = useSettings()
  const [sessionTimeLeftData, setSessionTimeLeftData] = useState(
    getTimeLeft(tasks, timer, settings)
  )
  const intervalId = useRef<number | null>(null)

  const handleTick = useCallback(() => {
    setSessionTimeLeftData(getTimeLeft(tasks, timer, settings))
  }, [tasks, timer, settings, setSessionTimeLeftData])

  useEffect(() => {
    handleTick()
    intervalId.current = window.setInterval(handleTick, 30 * 1000)
    return () => {
      if (intervalId.current) window.clearInterval(intervalId.current)
    }
  }, [handleTick])

  const { timeLeft, finishTime, pomodoriLeft } = sessionTimeLeftData

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp)
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const hoursLeft = (timeLeft / 1000 / 60 / 60).toFixed(1)

  if (timer.pomodoroCount < 2 && pomodoriLeft === 0) return null
  return (
    <div
      className={classNames(
        'mt-3 p-4 flex justify-around items-baseline rounded-md bg-neutral-700'
      )}
    >
      {pomodoriLeft > 0 ? (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{pomodoriLeft}</span>
            <span className="text-neutral-300">{`${pomodoriLeft === 1 ? 'pomodoro' : 'pomodori'} left`}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-neutral-300">Finish time:</span>
            <span className="text-lg font-semibold">{`${formatTime(finishTime)} (${hoursLeft}h)`}</span>
          </div>
        </>
      ) : (
        <span className="text-neutral-300">You've completed you session!</span>
      )}
    </div>
  )
}

export default SessionTimeLeftDisplay
