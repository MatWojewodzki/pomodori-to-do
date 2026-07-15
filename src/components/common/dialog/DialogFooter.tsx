import React from 'react'

type DialogFooterProps = {
  children?: React.ReactNode
}

function DialogFooter(props: DialogFooterProps) {
  return <div className="mt-16 flex justify-end gap-4">{props.children}</div>
}

export default DialogFooter
