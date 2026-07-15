import Settings from './Settings.tsx'
import { Dialog } from 'radix-ui'
import React from 'react'

type SettingsDialogProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SettingsDialog(props: SettingsDialogProps) {
  return (
    <>
      <Dialog.Title className="font-bold text-xl text-center">
        Settings
      </Dialog.Title>
      <Dialog.Description className="sr-only">
        Adjust your settings. Changes won't be applied until you click Save.
      </Dialog.Description>
      <Settings closeDialog={() => props.setOpen(false)} />
    </>
  )
}

export default SettingsDialog
