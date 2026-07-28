import React, { useEffect, useRef } from 'react'
import PanelHeader from '../Panel/PanelHeader.tsx'
import PanelTitle from '../Panel/PanelTitle.tsx'
import TextInput from '../common/form/TextInput.tsx'
import DialogFooter from '../common/dialog/DialogFooter.tsx'
import SecondaryDialogButton from '../common/dialog/SecondaryDialogButton.tsx'
import PrimaryDialogButton from '../common/dialog/PrimaryDialogButton.tsx'
import { Dialog } from 'radix-ui'

type TodoListDialogProps = {
  dialogTitle: string
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  handleSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitButtonText: string
}

function TodoListDialog(props: TodoListDialogProps) {
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])
  return (
    <form onSubmit={props.handleSubmit}>
      <PanelHeader>
        <PanelTitle>{props.dialogTitle}</PanelTitle>
      </PanelHeader>
      <TextInput
        label={'List title'}
        value={props.title}
        setValue={props.setTitle}
        ref={titleInputRef}
      />
      <DialogFooter>
        <Dialog.Close asChild>
          <SecondaryDialogButton type="button">Cancel</SecondaryDialogButton>
        </Dialog.Close>
        <PrimaryDialogButton type="submit">
          {props.submitButtonText}
        </PrimaryDialogButton>
      </DialogFooter>
    </form>
  )
}

export default TodoListDialog
