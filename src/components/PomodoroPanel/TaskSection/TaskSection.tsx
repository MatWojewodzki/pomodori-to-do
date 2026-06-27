import TaskList from './TaskList.tsx'
import TaskHeader from './TaskHeader.tsx'
import AddTaskButton from './AddTaskButton.tsx'
import { useState } from 'react'
import TaskCreationForm from './TaskCreationForm.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { useQuery } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import ErrorMessage from '../../common/ErrorMessage.tsx'
import { Collapsible } from 'radix-ui'

export type TaskSectionProps = {
  activeTaskId: string | null
  setActiveTaskId: (taskId: string) => void
  timer: Timer
}

function TaskSection(props: TaskSectionProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const taskResult = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  })

  return (
    <section className="my-16 flex justify-center">
      <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded} asChild>
        <div className="flex-1 max-w-121 flex flex-col">
          <TaskHeader taskSectionExpanded={isExpanded} />
          {taskResult.isError && <ErrorMessage text="Failed to load tasks." />}
          <Collapsible.Content className="grow flex flex-col">
            {taskResult.isSuccess && (
              <TaskList
                tasks={taskResult.data}
                activeTaskId={props.activeTaskId}
                setActiveTaskId={props.setActiveTaskId}
                timer={props.timer}
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
        </div>
      </Collapsible.Root>
    </section>
  )
}

export default TaskSection
