import React, { useState } from 'react'
import AddIcon from '../../assets/icons/add_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import MenuButton from './MenuButton.tsx'
import TodoListCreationDialog from '../TodoPanel/TodoListCreationDialog.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'

type AddTodoListButtonProps = {
  expanded: boolean
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function AddTodoListButton(props: AddTodoListButtonProps) {
  const [open, setOpen] = useState(false)
  const label = 'Create a new todo list'
  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      tooltipEnabled={!props.expanded}
      tooltipText={label}
      tooltipSide="right"
      dialog={
        <TodoListCreationDialog
          closeDialog={() => setOpen(false)}
          setOpenTodoListId={props.setOpenTodoListId}
        />
      }
    >
      <MenuButton>
        <AddIcon className="size-5 shrink-0" />
        <span className="pe-1">{label}</span>
      </MenuButton>
    </DialogButton>
  )
}

export default AddTodoListButton
