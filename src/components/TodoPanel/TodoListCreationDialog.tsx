import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import todoListService from '../../services/tauri/todoList.ts'
import TodoListDialog from './TodoListDialog.tsx'

type TodoListCreationDialogProps = {
  closeDialog: () => void
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListCreationDialog(props: TodoListCreationDialogProps) {
  const [title, setTitle] = useState('')

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: todoListService.createTodoList,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['todo-lists'] })
      props.setOpenTodoListId(data)
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (title.trim() === '') return
    mutation.mutate({ title: title.trim() })
    props.closeDialog()
  }

  return (
    <TodoListDialog
      dialogTitle="Create a new todo list"
      submitButtonText="Create"
      title={title}
      setTitle={setTitle}
      handleSubmit={handleSubmit}
    />
  )
}

export default TodoListCreationDialog
