import AppTitle from './AppTitle.tsx'
import { Screen } from '../MobileLayout.tsx'
import React from 'react'
import DropdownMenu from '../../../common/DropdownMenu/DropdownMenu.tsx'
import DropdownMenuItem from '../../../common/DropdownMenu/DropdownMenuItem.tsx'
import classNames from 'classnames'

type AppBarProps = {
  screenSelected: Screen
  setScreenSelected: React.Dispatch<React.SetStateAction<Screen>>
}

function AppBar(props: AppBarProps) {
  return (
    <div className="pt-[env(safe-area-inset-top)]">
      <div className="px-6 py-3 flex items-center justify-between bg-neutral-800">
        <AppTitle />
        <DropdownMenu
          tooltipText="More options"
          triggerLabel="More options"
          iconSize={24}
          triggerClassName={classNames(
            'text-neutral-200',
            'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
          )}
        >
          <DropdownMenuItem
            onSelect={() => props.setScreenSelected('settings')}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AppBar
