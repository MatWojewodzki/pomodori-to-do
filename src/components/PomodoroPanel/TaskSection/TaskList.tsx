import TaskListItem from './TaskListItem.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import taskService from '../../../services/tauri/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isSortable } from '@dnd-kit/react/sortable'
import { TimerType } from '../../../hooks/useTimerType.ts'
import useSettings from '../../../contexts/settings.tsx'

function uncompletedTaskPredicate(task: TaskDto) {
  return !task.completed && task.pomodoro_completed < task.pomodoro_total
}

function getNextActiveTaskId(tasks: TaskDto[], activeTaskId: string | null) {
  if (activeTaskId === null) return null
  const activeTaskIndex = tasks.findIndex((task) => task.id === activeTaskId)
  const activeTask = tasks[activeTaskIndex]
  if (
    !activeTask.completed &&
    activeTask.pomodoro_total - activeTask.pomodoro_completed > 1
  )
    return null

  const prevTasks = tasks.slice(0, activeTaskIndex)
  const nextTasks = tasks.slice(activeTaskIndex + 1)

  const nextActiveTask =
    nextTasks.find(uncompletedTaskPredicate) ||
    prevTasks.find(uncompletedTaskPredicate)
  if (nextActiveTask) return nextActiveTask.id

  return null
}

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
  const { auto_switch_active_task: autoSwitchActiveTask } = useSettings()
  const [localTasks, setLocalTasks] = useState<TaskDto[]>(tasks)
  const isDragging = useRef(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: taskService.moveTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const updateActiveTask = useCallback(
    (prevState: TimerType) => {
      if (!autoSwitchActiveTask || prevState !== TimerType.WORK) return
      const nextActiveTaskId = getNextActiveTaskId(tasks, activeTaskId)
      if (nextActiveTaskId) {
        setActiveTaskId(nextActiveTaskId)
      }
    },
    [autoSwitchActiveTask, tasks, activeTaskId, setActiveTaskId]
  )

  useEffect(() => {
    if (isDragging.current) return
    setLocalTasks(tasks)
  }, [tasks])

  const { onTimerFinish } = timer
  useEffect(() => {
    return onTimerFinish(updateActiveTask)
  }, [onTimerFinish, updateActiveTask])

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
