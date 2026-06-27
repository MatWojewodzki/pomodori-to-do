import { TaskDto } from '../../../../types/generated/TaskDto.ts'
import MoreVertIcon from '../../../../assets/icons/more_vert_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import classNames from 'classnames'
import { DropdownMenu } from 'radix-ui'
import EditIcon from '../../../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import taskService from '../../../../services/tauri/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tooltip from '../../../common/Tooltip.tsx'
import DragIndicatorIcon from '../../../../assets/icons/drag_indicator_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { forwardRef } from 'react'
import TaskDisplayBase from './TaskDisplayBase.tsx'
import { Timer } from '../../../../hooks/useTimer.ts'
import TaskDisplayTextContent from './TaskDisplayTextContent.tsx'

type TaskDisplayProps = {
  task: TaskDto
  timer: Timer
  openEditForm: () => void
  isActive: boolean
  setAsActive: () => void
}

const TaskDisplay = forwardRef<HTMLDivElement, TaskDisplayProps>(
  function TaskDisplay(props, ref) {
    const { task } = props
    const inputId = `task-${task.id}`

    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
      mutationFn: taskService.deleteTask,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      },
    })

    return (
      <TaskDisplayBase
        task={task}
        timer={props.timer}
        isActive={props.isActive}
      >
        <input
          type="radio"
          name="active-task"
          id={inputId}
          className="sr-only peer"
          checked={props.isActive}
          onChange={() => props.setAsActive()}
        />
        <label
          htmlFor={inputId}
          className={classNames(
            'block pe-17 cursor-pointer rounded-md',
            'peer-checked:outline-2 not-peer-checked:peer-focus-visible:outline',
            'not-peer-checked:hover:outline outline-neutral-400'
          )}
        >
          <TaskDisplayTextContent task={task} />
        </label>
        <div
          ref={ref}
          className={classNames(
            'absolute p-1 top-3.5 right-11 cursor-grab rounded-md text-neutral-400',
            'focus:outline-none focus-visible:text-white focus-visible:bg-neutral-800'
          )}
        >
          <DragIndicatorIcon className="size-5" />
        </div>
        <DropdownMenu.Root>
          <Tooltip text="More options">
            <DropdownMenu.Trigger
              aria-label="Open menu"
              className={classNames(
                'p-1 absolute z-10 right-3 top-3.5 rounded-md cursor-pointer',
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
      </TaskDisplayBase>
    )
  }
)

export default TaskDisplay
