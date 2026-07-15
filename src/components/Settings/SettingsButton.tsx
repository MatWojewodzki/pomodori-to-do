import SettingsIcon from '../../assets/icons/settings_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import Tooltip from '../common/Tooltip.tsx'
import { useState } from 'react'
import MenuButton from '../common/MenuButton.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'
import SettingsDialog from './SettingsDialog.tsx'

function SettingsButton() {
  const [open, setOpen] = useState(false)
  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      dialog={<SettingsDialog setOpen={setOpen} />}
    >
      <Tooltip text="Settings" side="right">
        <MenuButton aria-label="Open settings">
          <SettingsIcon className="size-5" />
        </MenuButton>
      </Tooltip>
    </DialogButton>
  )
}

export default SettingsButton
