import TaskListItem from './TaskListItem.tsx'
import { Timer } from '../../../hooks/useTimer.ts'
import { TaskDto } from '../../../types/generated/TaskDto.ts'

export type TaskListProps = {
  tasks: TaskDto[]
  activeTask: string | null
  setActiveTask: (taskId: string) => void
  timer: Timer
}

function TaskList(props: TaskListProps) {
  return (
    <ul
      role="radiogroup"
      aria-label="tasks"
      className="flex flex-col gap-3 mb-3"
    >
      {props.tasks.map((task) => (
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
