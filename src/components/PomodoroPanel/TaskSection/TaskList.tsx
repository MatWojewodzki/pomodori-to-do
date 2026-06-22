import TaskListItem from './TaskListItem.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useEffect, useRef, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'

export type TaskListProps = {
  tasks: TaskDto[]
  activeTask: string | null
  setActiveTask: (taskId: string) => void
  timer: Timer
}

function TaskList({ tasks, ...props }: TaskListProps) {
  const [localTasks, setLocalTasks] = useState<TaskDto[]>(tasks)
  const isDragging = useRef(false)

  useEffect(() => {
    if (isDragging.current) return
    setLocalTasks(tasks)
  }, [tasks])

  return (
    <DragDropProvider
      onDragStart={() => (isDragging.current = true)}
      onDragEnd={async (event) => {
        isDragging.current = false

        if (event.canceled) {
          setLocalTasks(tasks)
          return
        }

        setLocalTasks((tasks) => move(tasks, event))
      }}
    >
      <ul
        role="radiogroup"
        aria-label="tasks"
        className="flex flex-col gap-3 mb-3"
      >
        {localTasks.map((task, index) => (
          <TaskListItem
            key={task.id}
            task={task}
            isActive={task.id === props.activeTask}
            setAsActive={() => props.setActiveTask(task.id)}
            timer={props.timer}
            index={index}
          />
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default TaskList
