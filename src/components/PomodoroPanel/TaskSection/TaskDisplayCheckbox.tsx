import { TaskDto } from '../../../types/generated/TaskDto.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../../../services/tauri/task.ts'
import Tooltip from '../../common/Tooltip.tsx'
import classNames from 'classnames'
import CheckBoxOutlineBlankIcon from '../../../assets/icons/check_box_outline_blank_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import CheckBoxIcon from '../../../assets/icons/check_box_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'

type TaskDisplayCheckboxProps = {
  task: TaskDto
}

function TaskDisplayCheckbox({ task }: TaskDisplayCheckboxProps) {
  const queryClient = useQueryClient()
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
    <>
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
    </>
  )
}

export default TaskDisplayCheckbox
