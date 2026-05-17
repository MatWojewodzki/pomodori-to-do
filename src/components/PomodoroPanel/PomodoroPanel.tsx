import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'
import useTimer from '../../hooks/useTimer.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../../services/tauri/task.ts'
import { useCallback } from 'react'
import useSessionStorage from '../../hooks/useSessionStorage.ts'

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

  const handleWorkFinish = useCallback(() => {
    if (activeTask) {
      mutation.mutate({ id: activeTask })
    }
  }, [activeTask, mutation])

  const timer = useTimer({
    workFinishCallback: handleWorkFinish,
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
