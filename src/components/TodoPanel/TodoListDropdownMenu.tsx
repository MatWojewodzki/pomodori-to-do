import MyDropdownMenu from '../common/DropdownMenu/DropdownMenu.tsx'
import classNames from 'classnames'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import EditIcon from '../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import todoListService from '../../services/tauri/todoList.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import React, { useState } from 'react'
import TodoListEditDialog from './TodoListEditDIalog.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'

function pickPreviousTodoListId(
  todoLists: TodoListDto[],
  deletedTodoListId: string
): string | null {
  if (todoLists.length === 1) return null
  const index = todoLists.findIndex(
    (todoList) => todoList.id === deletedTodoListId
  )
  if (index === -1) return null
  const newActiveIndex = index === 0 ? 1 : index - 1
  return todoLists[newActiveIndex].id
}

type TodoListDropdownMenuProps = {
  todoLists: TodoListDto[]
  todoList: TodoListDto
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListDropdownMenu(props: TodoListDropdownMenuProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: todoListService.deleteTodoList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todo-lists'] })
      props.setOpenTodoListId((prev) =>
        prev === props.todoList.id
          ? pickPreviousTodoListId(props.todoLists, props.todoList.id)
          : prev
      )
    },
  })
  return (
    <MyDropdownMenu
      tooltipText="More options"
      triggerLabel="Open menu"
      triggerClassName={classNames(
        'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
      )}
    >
      <DialogButton
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        dialog={
          <TodoListEditDialog
            todoList={props.todoList}
            closeDialog={() => setEditDialogOpen(false)}
          />
        }
      >
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditIcon className="size-5" />
          <span>Edit title</span>
        </DropdownMenuItem>
      </DialogButton>
      <DropdownMenuItem
        className="text-red-300"
        onSelect={() => deleteMutation.mutate({ id: props.todoList.id })}
      >
        <DeleteIcon className="size-5" />
        <span>Delete list</span>
      </DropdownMenuItem>
    </MyDropdownMenu>
  )
}

export default TodoListDropdownMenu
