import TaskList from './TaskList.tsx'
import TaskHeader from './TaskHeader.tsx'
import AddTaskButton from './AddTaskButton.tsx'
import { useState } from 'react'
import TaskCreationForm from './TaskCreationForm.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { useQuery } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import ErrorMessage from '../../ErrorMessage.tsx'

export type TaskSectionProps = {
  activeTask: string | null
  setActiveTask: (taskId: string) => void
  timer: Timer
}

function TaskSection(props: TaskSectionProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const taskResult = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  })
  return (
    <section className="my-16 flex justify-center">
      <div className="flex-1 max-w-121 flex flex-col">
        <TaskHeader />
        {taskResult.isError && <ErrorMessage text="Failed to load tasks." />}
        {taskResult.isSuccess && (
          <TaskList
            tasks={taskResult.data}
            activeTask={props.activeTask}
            setActiveTask={props.setActiveTask}
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
      </div>
    </section>
  )
}

export default TaskSection
