import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useState } from 'react'
import TaskDisplay from './TaskDisplay.tsx'
import TaskEditForm from './TaskEditForm.tsx'
import { TimerType } from '../../../hooks/useTimerType.ts'
import { Timer } from '../../../hooks/useTimer.ts'
import { useSortable } from '@dnd-kit/react/sortable'

type TaskListItemProps = {
  task: TaskDto
  isActive: boolean
  setAsActive: () => void
  timer: Timer
  index: number
}

function TaskListItem(props: TaskListItemProps) {
  const { timer } = props
  const [isEditing, setIsEditing] = useState(false)
  const { ref, handleRef } = useSortable({
    id: props.task.id,
    index: props.index,
    disabled: { draggable: isEditing },
  })

  const standardProgress =
    (props.task.pomodoro_completed / props.task.pomodoro_total) * 100
  const timerProgress =
    standardProgress + timer.percentageCompleted / props.task.pomodoro_total

  const preciseProgress =
    props.isActive && timer.isRunning && timer.timerType == TimerType.WORK
      ? timerProgress
      : standardProgress

  return (
    <li ref={ref}>
      {isEditing ? (
        <TaskEditForm
          task={props.task}
          closeForm={() => setIsEditing(false)}
          isActive={props.isActive}
        />
      ) : (
        <TaskDisplay
          task={props.task}
          openEditForm={() => setIsEditing(true)}
          isActive={props.isActive}
          setAsActive={props.setAsActive}
          preciseProgress={preciseProgress}
          ref={handleRef}
        />
      )}
    </li>
  )
}

export default TaskListItem
