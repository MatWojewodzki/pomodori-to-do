import AppBar from './AppBar/AppBar.tsx'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import AppBarDropdownMenuAction from './AppBar/AppBarDropdownMenuAction.tsx'

function RootAppBar() {
  return (
    <AppBar
      title={
        <h2 className="flex items-center text-xl font-medium">
          Pomodori To Do
        </h2>
      }
      actions={[
        <AppBarDropdownMenuAction>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </AppBarDropdownMenuAction>,
      ]}
    />
  )
}

export default RootAppBar
