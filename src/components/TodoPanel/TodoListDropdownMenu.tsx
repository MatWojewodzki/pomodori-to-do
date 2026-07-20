import DropdownMenu from '../common/DropdownMenu/DropdownMenu.tsx'
import classNames from 'classnames'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import EditIcon from '../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import todoListService from '../../services/tauri/todoList.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import React from 'react'

type TodoListDropdownMenuProps = {
  todoList: TodoListDto
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListDropdownMenu(props: TodoListDropdownMenuProps) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: todoListService.deleteTodoList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todo-lists'] })
      props.setOpenTodoListId((prev) =>
        prev === props.todoList.id ? null : prev
      )
    },
  })
  return (
    <DropdownMenu
      tooltipText="More options"
      triggerLabel="Open menu"
      triggerClassName={classNames(
        'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
      )}
    >
      <DropdownMenuItem>
        <EditIcon className="size-5" />
        <span>Edit title</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-red-300"
        onSelect={() => deleteMutation.mutate({ id: props.todoList.id })}
      >
        <DeleteIcon className="size-5" />
        <span>Delete list</span>
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

export default TodoListDropdownMenu
