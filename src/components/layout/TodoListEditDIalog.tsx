import React, { useState } from 'react'
import TodoListDialog from './TodoListDialog.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import todoListService from '../../services/tauri/todoList.ts'

type TodoListEditDialogProps = {
  todoList: TodoListDto
  closeDialog: () => void
}

function TodoListEditDialog(props: TodoListEditDialogProps) {
  const [title, setTitle] = useState(props.todoList.title)

  const queryClient = useQueryClient()
  const editMutation = useMutation({
    mutationFn: todoListService.updateTodoList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todo-lists'] })
      props.closeDialog()
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (title.trim() === '') return
    editMutation.mutate({
      id: props.todoList.id,
      update: { title: title.trim() },
    })
  }

  return (
    <TodoListDialog
      dialogTitle="Edit todo list title"
      submitButtonText="Save"
      title={title}
      setTitle={setTitle}
      handleSubmit={handleSubmit}
    />
  )
}

export default TodoListEditDialog
