import { TaskDto } from '../../../../types/generated/TaskDto.ts'
import TaskDisplayBase from './TaskDisplayBase.tsx'
import { Timer } from '../../../../hooks/useTimer.ts'
import TaskDisplayTextContent from './TaskDisplayTextContent.tsx'

type ActiveTaskDisplayProps = {
  tasks: TaskDto[]
  activeTaskId: string
  timer: Timer
}

function ActiveTaskDisplay(props: ActiveTaskDisplayProps) {
  const task = props.tasks.find((task) => task.id === props.activeTaskId)
  if (!task) return
  return (
    <TaskDisplayBase task={task} timer={props.timer} isActive={true}>
      <div className="rounded-md outline-2 outline-neutral-400">
        <TaskDisplayTextContent task={task} />
      </div>
    </TaskDisplayBase>
  )
}

export default ActiveTaskDisplay
