import TaskListItem from './TaskListItem.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useEffect, useRef, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import taskService from '../../../services/tauri/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isSortable } from '@dnd-kit/react/sortable'

export type TaskListProps = {
  tasks: TaskDto[]
  activeTaskId: string | null
  setActiveTaskId: (taskId: string) => void
  timer: Timer
}

function TaskList({
  tasks,
  activeTaskId,
  setActiveTaskId,
  timer,
}: TaskListProps) {
  const [localTasks, setLocalTasks] = useState<TaskDto[]>(tasks)
  const isDragging = useRef(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: taskService.moveTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

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
        const { source } = event.operation
        if (isSortable(source)) {
          const { initialIndex, index: newIndex } = source
          mutation.mutate({
            initialIndex,
            newIndex,
          })
        }
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
            isActive={task.id === activeTaskId}
            setAsActive={() => setActiveTaskId(task.id)}
            timer={timer}
            index={index}
          />
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default TaskList
