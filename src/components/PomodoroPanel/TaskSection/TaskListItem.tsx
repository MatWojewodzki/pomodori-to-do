import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useState } from 'react'
import TaskDisplay from './TaskDisplay.tsx'
import TaskEditForm from './TaskEditForm.tsx'

type TaskListItemProps = {
    task: TaskDto
}

function TaskListItem(props: TaskListItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <li>
            {isEditing ? (
                <TaskEditForm
                    task={props.task}
                    closeForm={() => setIsEditing(false)}
                />
            ) : (
                <TaskDisplay
                    task={props.task}
                    openEditForm={() => setIsEditing(true)}
                />
            )}
        </li>
    )
}

export default TaskListItem
