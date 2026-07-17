import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'radix-ui'
import DialogTitle from '../common/dialog/DialogTitle.tsx'
import DialogFooter from '../common/dialog/DialogFooter.tsx'
import SecondaryDialogButton from '../common/dialog/SecondaryDialogButton.tsx'
import PrimaryDialogButton from '../common/dialog/PrimaryDialogButton.tsx'
import TextInput from '../common/form/TextInput.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import todoListService from '../../services/tauri/todoList.ts'

type TodoListCreationDialogProps = {
  closeDialog: () => void
}

function TodoListCreationDialog(props: TodoListCreationDialogProps) {
  const [title, setTitle] = useState('')
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: todoListService.createTodoList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todo-lists'] })
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (title.trim() === '') return
    mutation.mutate({ title: title.trim() })
    props.closeDialog()
  }

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{'Create a new todo list'}</DialogTitle>
      <div className="mt-6">
        <TextInput
          label={'List title'}
          value={title}
          setValue={setTitle}
          ref={titleInputRef}
        />
      </div>
      <DialogFooter>
        <Dialog.Close asChild>
          <SecondaryDialogButton type="button">Cancel</SecondaryDialogButton>
        </Dialog.Close>
        <PrimaryDialogButton type="submit">Create</PrimaryDialogButton>
      </DialogFooter>
    </form>
  )
}

export default TodoListCreationDialog
