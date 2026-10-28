import React from 'react'

type CentralMessageProps = {
  children?: React.ReactNode
}

function CentralMessage(props: CentralMessageProps) {
  return (
    <div className="grow flex items-center justify-center">
      <p className="text-neutral-300 text-sm text-center">{props.children}</p>
    </div>
  )
}

export default CentralMessage
