import SettingsIcon from '../../../assets/icons/settings_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { useState } from 'react'
import SidebarButton from './SidebarButton.tsx'
import SettingsDialog from '../../common/settings/SettingsDialog.tsx'
import DialogButton from '../../common/dialog/DialogButton.tsx'

type SettingsSidebarButtonProps = {
  expanded: boolean
}

function SettingsSidebarButton(props: SettingsSidebarButtonProps) {
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
      <SidebarButton>
        <SettingsIcon className="size-5 shrink-0" />
        <span className="pe-1">{label}</span>
      </SidebarButton>
    </DialogButton>
  )
}

export default SettingsSidebarButton
