import PanelHeader from '../Panel/PanelHeader.tsx'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'
import useTimer from '../../hooks/useTimer.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../../services/tauri/task.ts'
import { useCallback } from 'react'
import useSessionStorage from '../../hooks/useSessionStorage.ts'
import { SettingsDto } from '../../types/generated/SettingsDto.ts'
import { TimerType } from '../../hooks/useTimerType.ts'
import { showTimerNotification } from '../../services/notification.ts'

type PomodoroPanelContentProps = {
  isTodoPanelOpen: boolean
  settings: SettingsDto
}

function PomodoroPanelContent(props: PomodoroPanelContentProps) {
  const [activeTask, setActiveTask] = useSessionStorage<string | null>(
    'activeTask',
    null
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: taskService.incrementPomodoroCompleted,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const notificationsEnabled = props.settings.enable_notifications
  const handleTimerFinish = useCallback(
    (prevState: TimerType, newState: TimerType, pomodoroCount: number) => {
      if (notificationsEnabled) {
        showTimerNotification(
          prevState,
          pomodoroCount,
          newState == TimerType.LONG_BREAK
        ).then()
      }
      if (prevState == TimerType.WORK && activeTask) {
        mutation.mutate({ id: activeTask })
      }
    },
    [activeTask, mutation, notificationsEnabled]
  )

  const timer = useTimer({
    workDurationS: props.settings.work_duration,
    shortBreakDurationS: props.settings.short_break_duration,
    longBreakDurationS: props.settings.long_break_duration,
    pomodoriBetweenLongBreaks: props.settings.pomodori_between_long_breaks,
    timerFinishCallback: handleTimerFinish,
  })
  return (
    <>
      <PanelHeader>Pomodoro Timer</PanelHeader>
      <TimerSection timer={timer} />
      <TaskSection
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        timer={timer}
      />
    </>
  )
}

export default PomodoroPanelContent
