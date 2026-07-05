import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import Tooltip from '../common/Tooltip.tsx'
import React from 'react'
import classNames from 'classnames'
import ChecklistIcon from '../../assets/icons/checklist_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'

type TodoListMenuButtonProps = {
  todoList: TodoListDto
  openTodoList: TodoListDto | null
  setOpenTodoList: React.Dispatch<React.SetStateAction<TodoListDto | null>>
}

function TodoListMenuButton(props: TodoListMenuButtonProps) {
  const isOpen = props.openTodoList?.id === props.todoList.id

  const tooltipText = isOpen
    ? `Hide '${props.todoList.title}' todo list`
    : `Show '${props.todoList.title}' todo list`

  return (
    <Tooltip text={tooltipText} side="right">
      <button
        className={classNames(
          'p-1 rounded-sm cursor-pointer',
          'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500',
          { 'bg-neutral-600': isOpen }
        )}
        onClick={() =>
          props.setOpenTodoList((old) => {
            if (old?.id === props.todoList.id) return null
            return props.todoList
          })
        }
        aria-label={tooltipText}
        aria-expanded={isOpen}
        aria-controls="todo-panel"
      >
        <ChecklistIcon className="size-5" />
      </button>
    </Tooltip>
  )
}

export default TodoListMenuButton
