import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import PanelHeader from '../Panel/PanelHeader.tsx'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'
import useSessionStorage from '../../hooks/useSessionStorage.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../../services/tauri/task.ts'
import { useCallback } from 'react'
import { TimerType } from '../../hooks/useTimerType.ts'
import useTimer from '../../hooks/useTimer.ts'
import useSettings from '../../hooks/useSettings.ts'
import { showTimerNotification } from '../../services/notification.ts'

type PomodoroPanelProps = {
  isTodoPanelOpen: boolean
}

function PomodoroPanel(props: PomodoroPanelProps) {
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

  const { notifications_enabled: notificationsEnabled } = useSettings()
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
    timerFinishCallback: handleTimerFinish,
  })

  return (
    <Panel
      className={classNames('min-w-0 flex-1', {
        'rounded-s-lg': props.isTodoPanelOpen,
      })}
    >
      <PanelHeader>Pomodoro Timer</PanelHeader>
      <TimerSection timer={timer} />
      <TaskSection
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        timer={timer}
      />
    </Panel>
  )
}

export default PomodoroPanel
