import TaskSectionDropdownButton from './TaskSectionDropdownButton.tsx'
import PomodoroCountDisplay from './PomodoroCountDisplay.tsx'
import { Timer } from '../../../../hooks/useTimer.ts'

type TaskSectionHeaderProps = {
  taskSectionExpanded: boolean
  timer: Timer
}

function TaskSectionHeader(props: TaskSectionHeaderProps) {
  return (
    <div className="mb-4 ps-1 flex items-center">
      <h2 className="font-bold text-lg">Tasks</h2>
      <PomodoroCountDisplay timer={props.timer} />
      <TaskSectionDropdownButton
        taskSectionExpanded={props.taskSectionExpanded}
      />
    </div>
  )
}

export default TaskSectionHeader
