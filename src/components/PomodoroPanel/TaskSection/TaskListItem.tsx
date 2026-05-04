import { TaskDto } from '../../../types/generated/TaskDto.ts'
import MoreVertIcon from '../../../assets/icons/more_vert_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import classNames from 'classnames'

type TaskListItemProps = {
    task: TaskDto
}

function TaskListItem(props: TaskListItemProps) {
    const { task } = props
    const preciseProgress =
        (task.pomodoro_completed / task.pomodoro_total) * 100
    const inputId = `task-${task.id}`
    return (
        <li
            className="group relative rounded-md"
            style={{
                background: `linear-gradient(to right, var(--color-neutral-600) ${preciseProgress}%, var(--color-neutral-700) ${preciseProgress}%)`,
            }}
        >
            <input
                type="radio"
                name="active-task"
                id={inputId}
                className="sr-only peer"
            />
            <label
                htmlFor={inputId}
                className={classNames(
                    'ps-4 pe-14 py-4 flex justify-between gap-2 rounded-md cursor-pointer',
                    'peer-checked:outline-2 not-peer-checked:peer-focus-visible:outline-1', // peer-focus-visible could be deleted if it was guaranteed that a radio button would always be selected
                    'not-peer-checked:hover:outline-1 outline-neutral-400'
                )}
            >
                <span className="flex-1">{task.text}</span>
                <span className="shrink-0 tabular-nums">
                    {task.pomodoro_completed}/{task.pomodoro_total}
                </span>
            </label>
            <button
                className={classNames(
                    'p-1 absolute z-10 right-3 top-3 rounded-md cursor-pointer',
                    'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
                    'invisible group-hover:visible group-focus-within:visible'
                )}
            >
                <MoreVertIcon className="size-6" />
            </button>
        </li>
    )
}

export default TaskListItem
