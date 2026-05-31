import { Dialog } from 'radix-ui'
import classNames from 'classnames'
import SettingsIcon from '../../assets/icons/settings_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import CloseIcon from '../../assets/icons/close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import Tooltip from '../Tooltip.tsx'
import Settings from './Settings.tsx'
import { useState } from 'react'

function SettingsButton() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip text="Settings" side="right">
        <Dialog.Trigger
          aria-label="Open settings"
          className={classNames(
            'p-1 rounded-sm cursor-pointer',
            'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500'
          )}
        >
          <SettingsIcon className="size-5" />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-500/30" />
        <Dialog.Content
          className={classNames(
            'flex flex-col',
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[90vw] max-w-xl h-[90vh] p-6 rounded-md bg-neutral-800 text-white',
            'border border-neutral-600'
          )}
        >
          <Dialog.Title className="mb-8 font-bold text-xl text-center">
            Settings
          </Dialog.Title>
          <Dialog.Close
            aria-label="Close settings"
            className={classNames(
              'absolute top-6 right-6 p-1 rounded-md cursor-pointer',
              'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700'
            )}
          >
            <CloseIcon className="size-5" />
          </Dialog.Close>
          <Settings closeDialog={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SettingsButton
