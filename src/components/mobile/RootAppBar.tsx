import AppBar from './AppBar.tsx'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import DropdownMenu from '../common/DropdownMenu/DropdownMenu.tsx'
import classNames from 'classnames'

function RootAppBar() {
  return (
    <AppBar
      title={<h2 className="text-xl font-medium">Pomodori To Do</h2>}
      actions={[
        <DropdownMenu
          tooltipText="More options"
          triggerLabel="More options"
          iconSize={24}
          triggerClassName={classNames(
            'text-neutral-200',
            'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
          )}
        >
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenu>,
      ]}
    />
  )
}

export default RootAppBar
