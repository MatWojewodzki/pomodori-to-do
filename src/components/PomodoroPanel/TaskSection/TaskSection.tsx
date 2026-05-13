import TaskList from './TaskList.tsx'
import TaskHeader from './TaskHeader.tsx'
import AddTaskButton from './AddTaskButton.tsx'
import { useState } from 'react'
import TaskCreationForm from './TaskCreationForm.tsx'
import { Timer } from '../../../hooks/useTimer.ts'

export type TaskSectionProps = {
    activeTask: string | null
    setActiveTask: (taskId: string) => void
    timer: Timer
}

function TaskSection(props: TaskSectionProps) {
    const [isAddingTask, setIsAddingTask] = useState(false)
    return (
        <section className="my-16 flex justify-center">
            <div className="flex-1 max-w-121 flex flex-col">
                <TaskHeader />
                <TaskList
                    activeTask={props.activeTask}
                    setActiveTask={props.setActiveTask}
                    timer={props.timer}
                />
                {!isAddingTask && (
                    <AddTaskButton onClick={() => setIsAddingTask(true)} />
                )}
                {isAddingTask && (
                    <TaskCreationForm
                        closeForm={() => setIsAddingTask(false)}
                    />
                )}
            </div>
        </section>
    )
}

export default TaskSection
