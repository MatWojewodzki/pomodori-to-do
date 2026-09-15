import { useCallback, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSettings from '../../../contexts/settings.tsx'
import useSessionStorage from '../../../hooks/useSessionStorage.ts'
import taskService from '../../../services/tauri/task.ts'
import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { TimerType } from '../../../hooks/useTimerType.ts'
import notificationService from '../../../services/notification.ts'
import useTimer from '../../../hooks/useTimer.ts'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'

function PomodoroView() {
  const { notifications_enabled: notificationsEnabled } = useSettings()
  const [activeTaskId, setActiveTaskId] = useSessionStorage<string | null>(
    'activeTaskId',
    null
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: taskService.incrementPomodoroCompleted,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks = queryClient.getQueryData<TaskDto[]>(['tasks']) ?? []

      queryClient.setQueryData(['tasks'], (old: TaskDto[]) =>
        old.map((task) =>
          task.id === id
            ? { ...task, pomodoro_completed: task.pomodoro_completed + 1 }
            : task
        )
      )

      return { previousTasks }
    },
    onError: (_err, _data, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks ?? [])
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleTimerFinish = useCallback(
    (prevState: TimerType, newState: TimerType, pomodoroCount: number) => {
      if (notificationsEnabled) {
        notificationService
          .sendTimerNotification(
            prevState,
            pomodoroCount,
            newState == TimerType.LONG_BREAK
          )
          .then()
      }
      if (prevState === TimerType.WORK && activeTaskId) {
        mutation.mutate({ id: activeTaskId })
      }
    },
    [activeTaskId, mutation, notificationsEnabled]
  )

  const timer = useTimer()
  const { onTimerFinish } = timer

  useEffect(() => {
    return onTimerFinish(handleTimerFinish)
  }, [onTimerFinish, handleTimerFinish])

  return (
    <div className="flex flex-col">
      <TimerSection timer={timer} />
      <TaskSection
        activeTaskId={activeTaskId}
        setActiveTaskId={setActiveTaskId}
        timer={timer}
      />
    </div>
  )
}

export default PomodoroView
