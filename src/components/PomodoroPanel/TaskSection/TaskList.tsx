import { useQuery } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import TaskListItem from './TaskListItem.tsx'
import { Timer } from '../../../hooks/useTimer.ts'

export type TaskListProps = {
  activeTask: string | null
  setActiveTask: (taskId: string) => void
  timer: Timer
}

function TaskList(props: TaskListProps) {
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  })
  if (!result.isSuccess || result.data.length == 0) return
  return (
    <ul
      role="radiogroup"
      aria-label="tasks"
      className="flex flex-col gap-3 mb-3"
    >
      {result.data.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          isActive={task.id === props.activeTask}
          setAsActive={() => props.setActiveTask(task.id)}
          timer={props.timer}
        />
      ))}
    </ul>
  )
}

export default TaskList
