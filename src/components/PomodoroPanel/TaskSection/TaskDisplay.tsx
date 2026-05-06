import { TaskDto } from '../../../types/generated/TaskDto.ts'
import MoreVertIcon from '../../../assets/icons/more_vert_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import classNames from 'classnames'
import { DropdownMenu, Tooltip } from 'radix-ui'
import EditIcon from '../../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import taskApi from '../../../api/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type TaskDisplayProps = {
    task: TaskDto
    openEditForm: () => void
}

function TaskDisplay(props: TaskDisplayProps) {
    const { task } = props
    const preciseProgress =
        (task.pomodoro_completed / task.pomodoro_total) * 100
    const inputId = `task-${task.id}`

    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: taskApi.deleteTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })

    return (
        <div
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
            <Tooltip.Root>
                <DropdownMenu.Root>
                    <Tooltip.Trigger asChild>
                        <DropdownMenu.Trigger
                            aria-label="Open menu"
                            className={classNames(
                                'p-1 absolute z-10 right-3 top-3 rounded-md cursor-pointer',
                                'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
                                'invisible group-hover:visible group-focus-within:visible'
                            )}
                        >
                            <MoreVertIcon className="size-6" />
                        </DropdownMenu.Trigger>
                    </Tooltip.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={4}
                            className={classNames(
                                'flex flex-col py-2 text-white text-sm rounded-md bg-neutral-900'
                            )}
                        >
                            <DropdownMenu.Item
                                className={classNames(
                                    'flex justify-start items-center gap-4 px-4 py-2 cursor-pointer',
                                    'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800'
                                )}
                                onSelect={() => props.openEditForm()}
                            >
                                <EditIcon className="size-5" />
                                <span>Edit</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                className={classNames(
                                    'flex justify-start items-center gap-4 px-4 py-2 cursor-pointer',
                                    'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
                                    'text-red-300'
                                )}
                                onSelect={() =>
                                    deleteMutation.mutate({
                                        id: task.id,
                                    })
                                }
                            >
                                <DeleteIcon className="size-5" />
                                <span>Delete</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="bottom"
                        align="end"
                        sideOffset={4}
                        className="px-2 py-1 text-neutral-300 text-xs rounded-md bg-neutral-900"
                    >
                        More options
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </div>
    )
}

export default TaskDisplay
