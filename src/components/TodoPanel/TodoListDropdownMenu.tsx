import DropdownMenu from '../common/DropdownMenu/DropdownMenu.tsx'
import classNames from 'classnames'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import EditIcon from '../../assets/icons/edit_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import DeleteIcon from '../../assets/icons/delete_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'

function TodoListDropdownMenu() {
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
      <DropdownMenuItem className="text-red-300">
        <DeleteIcon className="size-5" />
        <span>Delete list</span>
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

export default TodoListDropdownMenu
