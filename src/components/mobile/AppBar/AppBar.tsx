import React from 'react'

type AppBarProps = {
  leading?: React.ReactNode
  title?: React.ReactNode
  actions?: React.ReactNode[]
}

function AppBar(props: AppBarProps) {
  return (
    <div className="pt-[env(safe-area-inset-top)]">
      <div className="px-3 py-3 flex bg-neutral-700">
        <div className="grow flex items-center gap-3">
          <span>{props.leading}</span>
          <span>{props.title}</span>
        </div>
        <ul className="flex gap-4">
          {props.actions?.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppBar
