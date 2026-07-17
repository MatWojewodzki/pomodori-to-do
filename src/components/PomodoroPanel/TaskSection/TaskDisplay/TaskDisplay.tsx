import { TaskDto } from '../../../../types/generated/TaskDto.ts'
import classNames from 'classnames'
import EditIcon from '../../../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import taskService from '../../../../services/tauri/task.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DragIndicatorIcon from '../../../../assets/icons/drag_indicator_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { forwardRef } from 'react'
import TaskDisplayBase from './TaskDisplayBase.tsx'
import { Timer } from '../../../../hooks/useTimer.ts'
import TaskDisplayTextContent from './TaskDisplayTextContent.tsx'
import DropdownMenu from '../../../common/DropdownMenu/DropdownMenu.tsx'
import DropdownMenuItem from '../../../common/DropdownMenu/DropdownMenuItem.tsx'

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
        <DropdownMenu tooltipText="More options" triggerLabel="Open menu">
          <DropdownMenuItem onSelect={() => props.openEditForm()}>
            <EditIcon className="size-5" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-300"
            onSelect={() =>
              deleteMutation.mutate({
                id: task.id,
              })
            }
          >
            <DeleteIcon className="size-5" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </TaskDisplayBase>
    )
  }
)

export default TaskDisplay
