import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useState } from 'react'
import TaskDisplay from './TaskDisplay.tsx'
import TaskEditForm from './TaskEditForm.tsx'
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
          timer={timer}
          openEditForm={() => setIsEditing(true)}
          isActive={props.isActive}
          setAsActive={props.setAsActive}
          ref={handleRef}
        />
      )}
    </li>
  )
}

export default TaskListItem
