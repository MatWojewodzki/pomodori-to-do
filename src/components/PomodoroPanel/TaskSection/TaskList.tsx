import { useQuery } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import TaskListItem from './TaskListItem.tsx'
import { useState } from 'react'

function TaskList() {
    const [activeTask, setActiveTask] = useState<string | null>(null)
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
                    isActive={task.id === activeTask}
                    setAsActive={() => setActiveTask(task.id)}
                />
            ))}
        </ul>
    )
}

export default TaskList
