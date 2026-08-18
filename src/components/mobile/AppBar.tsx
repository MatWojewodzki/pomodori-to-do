import React from 'react'

type AppBarProps = {
  leading?: React.ReactNode
  title?: React.ReactNode
  actions?: React.ReactNode[]
}

function AppBar(props: AppBarProps) {
  return (
    <div className="pt-[env(safe-area-inset-top)]">
      <div className="px-6 py-3 flex bg-neutral-700">
        <div className="grow flex gap-4">
          {props.leading}
          {props.title}
        </div>
        <div className="flex gap-4">{props.actions}</div>
      </div>
    </div>
  )
}

export default AppBar
