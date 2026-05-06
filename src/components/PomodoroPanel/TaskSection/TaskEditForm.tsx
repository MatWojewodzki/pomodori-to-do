import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskApi from '../../../api/task.ts'
import TaskForm from './TaskForm.tsx'
import { TaskDto } from '../../../types/generated/TaskDto.ts'

type TaskEditFormProps = {
    task: TaskDto
    closeForm: () => void
}

function TaskEditForm(props: TaskEditFormProps) {
    const task = props.task
    const [taskDescription, setTaskDescription] = useState(task.text)
    const [totalPomodoriCount, setTotalPomodoriCount] = useState(
        task.pomodoro_total
    )

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: taskApi.updateTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] })
            props.closeForm()
        },
    })

    function handleSubmit() {
        if (taskDescription.trim() === '') return
        mutation.mutate({
            updatedTask: {
                ...task,
                text: taskDescription,
                pomodoro_total: totalPomodoriCount,
            },
        })
    }
    return (
        <TaskForm
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            totalPomodoriCount={totalPomodoriCount}
            setTotalPomodoriCount={setTotalPomodoriCount}
            handleSubmit={handleSubmit}
            handleCancel={props.closeForm}
            submitButtonText={'Save'}
        />
    )
}

export default TaskEditForm
