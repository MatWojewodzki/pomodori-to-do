import classNames from 'classnames'
import { TodoDto } from '../../types/generated/TodoDto.ts'
import CheckBox from '../../assets/icons/check_box_22dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import CheckBoxOutlineBlank from '../../assets/icons/check_box_outline_blank_22dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import DeleteIcon from '../../assets/icons/delete_22dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import todoService from '../../services/tauri/todo.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tooltip from '../common/Tooltip.tsx'
import { useSortable } from '@dnd-kit/react/sortable'

export type TodoListItemProps = {
  todo: TodoDto
  index: number
}

function TodoListItem({ todo, index }: TodoListItemProps) {
  const { ref, isDragging } = useSortable({ id: todo.id, index })
  const queryClient = useQueryClient()

  const setCompletedMutation = useMutation({
    mutationFn: todoService.setCompleted,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const checkBoxTooltip = todo.completed
    ? 'Mark as incomplete'
    : 'Mark as complete'
  return (
    <li
      ref={ref}
      className={classNames(
        'flex items-start gap-2 px-2 py-1 group rounded-md cursor-grab',
        'hover:bg-neutral-600 focus:outline-none focus-within:bg-neutral-600',
        { 'line-through': todo.completed },
        { 'bg-neutral-600': isDragging }
      )}
    >
      <Tooltip text={checkBoxTooltip}>
        <button
          type="button"
          aria-pressed={todo.completed}
          aria-label={checkBoxTooltip}
          className={classNames(
            'shrink-0 p-1 rounded-md cursor-pointer',
            'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700'
          )}
          onClick={() =>
            setCompletedMutation.mutate({
              id: todo.id,
              completed: !todo.completed,
            })
          }
        >
          {todo.completed ? (
            <CheckBox className="size-5.5" />
          ) : (
            <CheckBoxOutlineBlank className="size-5.5" />
          )}
        </button>
      </Tooltip>
      <span className="min-w-0 pt-1 flex-1 overflow-hidden text-ellipsis">
        {todo.text}
      </span>
      <Tooltip text="Delete todo">
        <button
          className={classNames(
            'p-1 shrink-0 rounded-md text-neutral-400 cursor-pointer',
            'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700',
            'invisible group-hover:visible group-focus-within:visible'
          )}
          onClick={() => deleteMutation.mutate({ id: todo.id })}
          aria-label="Delete todo"
        >
          <DeleteIcon className="size-5.5" />
        </button>
      </Tooltip>
    </li>
  )
}

export default TodoListItem
