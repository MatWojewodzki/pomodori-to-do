import AppBar from './AppBar/AppBar.tsx'
import DropdownMenuItem from '../common/DropdownMenu/DropdownMenuItem.tsx'
import AppBarDropdownMenuAction from './AppBar/AppBarDropdownMenuAction.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'
import { useState } from 'react'
import SettingsDialog from '../common/SettingsDIalog/SettingsDialog.tsx'

function RootAppBar() {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  return (
    <AppBar
      title={
        <h2 className="flex items-center text-xl font-medium">
          Pomodori To Do
        </h2>
      }
      actions={[
        <AppBarDropdownMenuAction>
          <DialogButton
            open={settingsDialogOpen}
            setOpen={setSettingsDialogOpen}
            dialog={
              <SettingsDialog
                closeDialog={() => setSettingsDialogOpen(false)}
              />
            }
            tooltipEnabled={false}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Settings
            </DropdownMenuItem>
          </DialogButton>
        </AppBarDropdownMenuAction>,
      ]}
    />
  )
}

export default RootAppBar
