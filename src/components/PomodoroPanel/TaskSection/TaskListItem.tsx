import { TaskDto } from '../../../types/generated/TaskDto.ts'

type TaskListItemProps = {
    task: TaskDto
}

function TaskListItem(props: TaskListItemProps) {
    const { task } = props
    return (
        <div className="p-4 rounded-md bg-neutral-600">
            <span>{task.text}</span>
        </div>
    )
}

export default TaskListItem
