import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskApi from '../../../api/task.ts'
import TaskForm from './TaskForm.tsx'

type TaskCreationFormProps = {
    closeForm: () => void
}

function TaskCreationForm(props: TaskCreationFormProps) {
    const [taskDescription, setTaskDescription] = useState('')
    const [totalPomodoriCount, setTotalPomodoriCount] = useState(1)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: taskApi.createTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] })
            setTaskDescription('')
            setTotalPomodoriCount(1)
        },
    })

    function handleSubmit() {
        if (taskDescription.trim() === '') return
        mutation.mutate({
            text: taskDescription.trim(),
            pomodoroTotal: totalPomodoriCount,
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
        />
    )
}

export default TaskCreationForm
