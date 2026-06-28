import TaskSectionDropdownButton from './TaskSectionDropdownButton.tsx'

type TaskSectionHeaderProps = {
  taskSectionExpanded: boolean
}

function TaskSectionHeader(props: TaskSectionHeaderProps) {
  return (
    <div className="mb-4 ps-1 flex justify-between items-center">
      <h2 className="font-bold text-lg">Tasks</h2>
      <TaskSectionDropdownButton
        taskSectionExpanded={props.taskSectionExpanded}
      />
    </div>
  )
}

export default TaskSectionHeader
