import Settings from './Settings.tsx'
import { Dialog } from 'radix-ui'
import DialogTitle from '../dialog/DialogTitle.tsx'

type SettingsDialogProps = {
  closeDialog: () => void
}

function SettingsDialog(props: SettingsDialogProps) {
  return (
    <>
      <DialogTitle>Settings</DialogTitle>
      <Dialog.Description className="sr-only">
        Adjust your settings. Changes won't be applied until you click Save.
      </Dialog.Description>
      <Settings closeDialog={props.closeDialog} />
    </>
  )
}

export default SettingsDialog
