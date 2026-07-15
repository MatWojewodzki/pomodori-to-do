import { useState } from 'react'
import Tooltip from '../common/Tooltip.tsx'
import AddIcon from '../../assets/icons/add_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import MenuButton from '../common/MenuButton.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'

function AddTodoListButton() {
  const [open, setOpen] = useState(false)
  const tooltipText = 'Create a new todo list'
  return (
    <DialogButton open={open} setOpen={setOpen}>
      <Tooltip text={tooltipText} side="right">
        <MenuButton aria-label={tooltipText}>
          <AddIcon className="size-5" />
        </MenuButton>
      </Tooltip>
    </DialogButton>
  )
}

export default AddTodoListButton
