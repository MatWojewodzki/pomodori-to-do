import React, { useState } from 'react'
import AddIcon from '../../assets/icons/add_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import MenuButton from '../common/MenuButton.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'
import TodoListCreationDialog from './TodoListCreationDialog.tsx'

type AddTodoListButtonProps = {
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function AddTodoListButton(props: AddTodoListButtonProps) {
  const [open, setOpen] = useState(false)
  const tooltipText = 'Create a new todo list'
  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      tooltipText={tooltipText}
      tooltipSide="right"
      dialog={
        <TodoListCreationDialog
          closeDialog={() => setOpen(false)}
          setOpenTodoListId={props.setOpenTodoListId}
        />
      }
    >
      <MenuButton aria-label={tooltipText}>
        <AddIcon className="size-5" />
      </MenuButton>
    </DialogButton>
  )
}

export default AddTodoListButton
