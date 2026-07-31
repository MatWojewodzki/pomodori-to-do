import SettingsIcon from '../../assets/icons/settings_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { useState } from 'react'
import MenuButton from '../LeftMenu/MenuButton.tsx'
import SettingsDialog from './SettingsDialog.tsx'
import DialogButton from '../common/dialog/DialogButton.tsx'

type SettingsButtonProps = {
  expanded: boolean
}

function SettingsButton(props: SettingsButtonProps) {
  const [open, setOpen] = useState(false)
  const label = 'Settings'
  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      tooltipEnabled={!props.expanded}
      tooltipText={label}
      tooltipSide="right"
      dialog={<SettingsDialog setOpen={setOpen} />}
    >
      <MenuButton>
        <SettingsIcon className="size-5 shrink-0" />
        <span className="pe-1">{label}</span>
      </MenuButton>
    </DialogButton>
  )
}

export default SettingsButton
