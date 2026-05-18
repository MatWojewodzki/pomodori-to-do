import { TaskDto } from '../../../types/generated/TaskDto.ts'
import MoreVertIcon from '../../../assets/icons/more_vert_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import classNames from 'classnames'
import { DropdownMenu } from 'radix-ui'
import EditIcon from '../../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import taskService from '../../../services/tauri/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tooltip from '../../Tooltip.tsx'
import CheckBoxOutlineBlankIcon from '../../../assets/icons/check_box_outline_blank_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import CheckBoxIcon from '../../../assets/icons/check_box_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'

type TaskDisplayProps = {
  task: TaskDto
  openEditForm: () => void
  isActive: boolean
  setAsActive: () => void
  preciseProgress: number
}

function TaskDisplay(props: TaskDisplayProps) {
  const { task } = props
  const inputId = `task-${task.id}`

  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const setCompletedMutation = useMutation({
    mutationFn: taskService.setTaskCompleted,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const checkBoxTooltip = task.completed
    ? 'Mark as incomplete'
    : 'Mark as complete'
  return (
    <div
      className="group relative rounded-md"
      style={{
        background: `linear-gradient(to right, var(--color-neutral-600) ${props.preciseProgress}%, var(--color-neutral-700) ${props.preciseProgress}%)`,
      }}
    >
      <input
        type="radio"
        name="active-task"
        id={inputId}
        className="sr-only peer"
        checked={props.isActive}
        onChange={() => props.setAsActive()}
      />
      <Tooltip text={checkBoxTooltip}>
        <button
          type="button"
          aria-pressed={task.completed}
          aria-label={checkBoxTooltip}
          className={classNames(
            'absolute left-3 top-3 shrink-0 p-1 rounded-md cursor-pointer',
            'hover:bg-neutral-800 focus-visible:outline-none focus-visible:bg-neutral-800'
          )}
          onClick={() => {
            setCompletedMutation.mutate({
              id: task.id,
              completed: !task.completed,
            })
          }}
        >
          {task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </button>
      </Tooltip>
      <label
        htmlFor={inputId}
        className={classNames(
          'px-14 py-4 flex justify-between gap-3 rounded-md cursor-pointer',
          'peer-checked:outline-2 not-peer-checked:peer-focus-visible:outline-1',
          'not-peer-checked:hover:outline-1 outline-neutral-400'
        )}
      >
        <span
          className={classNames('flex-1', { 'line-through': task.completed })}
        >
          {task.text}
        </span>
        <span className="shrink-0 tabular-nums">
          {task.pomodoro_completed}/{task.pomodoro_total}
        </span>
      </label>
      <DropdownMenu.Root>
        <Tooltip text="More options">
          <DropdownMenu.Trigger
            aria-label="Open menu"
            className={classNames(
              'p-1 absolute z-10 right-3.5 top-3.5 rounded-md cursor-pointer',
              'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
              'invisible group-hover:visible group-focus-within:visible'
            )}
          >
            <MoreVertIcon className="size-5" />
          </DropdownMenu.Trigger>
        </Tooltip>
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
    </div>
  )
}

export default TaskDisplay
