import { Dialog } from 'radix-ui'
import React from 'react'

type DialogTitleProps = {
  children?: React.ReactNode
}

function DialogTitle(props: DialogTitleProps) {
  return (
    <Dialog.Title className="font-bold text-xl text-center">
      {props.children}
    </Dialog.Title>
  )
}

export default DialogTitle
