import React from 'react'
import CloseIcon from '../../assets/icons/close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import { Dialog } from 'radix-ui'
import classNames from 'classnames'

type DialogButtonProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  dialog?: React.ReactNode
  children?: React.ReactNode
}

function DialogButton(props: DialogButtonProps) {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.setOpen}>
      <Dialog.Trigger>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-500/30" />
        <Dialog.Content
          className={classNames(
            'flex flex-col p-6 text-white overflow-y-auto',
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-screen max-w-xl max-h-screen',
            'rounded-md bg-neutral-800 border border-neutral-600'
          )}
        >
          <Dialog.Close
            aria-label="Close settings"
            className={classNames(
              'absolute top-6 right-6 p-1 rounded-md cursor-pointer',
              'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700'
            )}
          >
            <CloseIcon className="size-5" />
          </Dialog.Close>
          {props.dialog}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogButton
