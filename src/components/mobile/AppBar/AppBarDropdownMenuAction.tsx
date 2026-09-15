import React from 'react'
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu.tsx'
import classNames from 'classnames'

type AppBarDropdownMenuActionProps = {
  children?: React.ReactNode
}

function AppBarDropdownMenuAction(props: AppBarDropdownMenuActionProps) {
  return (
    <DropdownMenu
      tooltipText="More options"
      triggerLabel="More options"
      iconSize={24}
      triggerClassName={classNames(
        'text-neutral-200',
        'hover:bg-neutral-600 active:bg-neutral-600',
        'focus:outline-none focus-visible:bg-neutral-600'
      )}
    >
      {props.children}
    </DropdownMenu>
  )
}

export default AppBarDropdownMenuAction
