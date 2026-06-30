import TaskList from './TaskList.tsx'
import TaskSectionHeader from './TaskSectionHeader/TaskSectionHeader.tsx'
import AddTaskButton from './AddTaskButton.tsx'
import { useCallback, useEffect, useState } from 'react'
import TaskCreationForm from './TaskCreationForm.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { useQuery } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import ErrorMessage from '../../common/ErrorMessage.tsx'
import { Collapsible } from 'radix-ui'
import ActiveTaskDisplay from './TaskDisplay/ActiveTaskDisplay.tsx'
import SessionTimeLeftDisplay from './SessionTimeLeftDisplay.tsx'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import useSettings from '../../../contexts/settings.tsx'
import { TimerType } from '../../../hooks/useTimerType.ts'

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

export type TaskSectionProps = {
  activeTaskId: string | null
  setActiveTaskId: (taskId: string) => void
  timer: Timer
}

function TaskSection({
  activeTaskId,
  setActiveTaskId,
  timer,
}: TaskSectionProps) {
  const { auto_switch_active_task: autoSwitchActiveTask } = useSettings()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const taskResult = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  })

  const { data: tasks } = taskResult
  const updateActiveTask = useCallback(
    (prevState: TimerType) => {
      if (!tasks) return
      if (!autoSwitchActiveTask || prevState !== TimerType.WORK) return
      const nextActiveTaskId = getNextActiveTaskId(tasks, activeTaskId)
      if (nextActiveTaskId) {
        setActiveTaskId(nextActiveTaskId)
      }
    },
    [autoSwitchActiveTask, tasks, activeTaskId, setActiveTaskId]
  )

  const { onTimerFinish } = timer
  useEffect(() => {
    return onTimerFinish(updateActiveTask)
  }, [onTimerFinish, updateActiveTask])

  return (
    <section className="my-16 flex justify-center">
      <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded} asChild>
        <div className="flex-1 max-w-121 flex flex-col">
          <TaskSectionHeader taskSectionExpanded={isExpanded} timer={timer} />
          {taskResult.isError && <ErrorMessage text="Failed to load tasks." />}
          {taskResult.isSuccess && !isExpanded && activeTaskId && (
            <ActiveTaskDisplay
              tasks={taskResult.data}
              timer={timer}
              activeTaskId={activeTaskId}
            />
          )}
          <Collapsible.Content className="grow flex flex-col">
            {taskResult.isSuccess && (
              <TaskList
                tasks={taskResult.data}
                activeTaskId={activeTaskId}
                setActiveTaskId={setActiveTaskId}
                timer={timer}
              />
            )}
            {!isAddingTask && (
              <AddTaskButton onClick={() => setIsAddingTask(true)} />
            )}
            {isAddingTask && (
              <TaskCreationForm
                key={taskResult.data?.length ?? 0}
                closeForm={() => setIsAddingTask(false)}
              />
            )}
          </Collapsible.Content>
          {taskResult.isSuccess && taskResult.data.length > 0 && (
            <SessionTimeLeftDisplay tasks={taskResult.data} timer={timer} />
          )}
        </div>
      </Collapsible.Root>
    </section>
  )
}

export default TaskSection
