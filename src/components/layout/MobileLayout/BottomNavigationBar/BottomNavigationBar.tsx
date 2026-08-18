import React from 'react'
import classNames from 'classnames'
import NavigationButton from './NavigationButton.tsx'
import TimerIcon from '../../../../assets/icons/timer_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import ListIcon from '../../../../assets/icons/list_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import TimerFillIcon from '../../../../assets/icons/timer_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg?react'
import ListFillIcon from '../../../../assets/icons/list_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg?react'
import { Screen } from '../MobileLayout.tsx'

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type BottomNavigationBarProps = {
  screenSelected: Screen
  setScreenSelected: React.Dispatch<React.SetStateAction<Screen>>
}

function BottomNavigationBar(props: BottomNavigationBarProps) {
  const navigationButtons: {
    screenName: Screen
    icon: React.ReactElement
    fillIcon: React.ReactElement
  }[] = [
    {
      screenName: 'todos',
      icon: <ListIcon className="size-6" />,
      fillIcon: <ListFillIcon className="size-6" />,
    },
    {
      screenName: 'timer',
      icon: <TimerIcon className="size-6" />,
      fillIcon: <TimerFillIcon className="size-6" />,
    },
  ]
  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div
        className={classNames(
          'px-4 py-1 flex items-center justify-around bg-neutral-700'
        )}
      >
        {navigationButtons.map((screen) => (
          <NavigationButton
            text={capitalizeFirstLetter(screen.screenName)}
            icon={screen.icon}
            selectedIcon={screen.fillIcon}
            isSelected={props.screenSelected === screen.screenName}
            select={() => props.setScreenSelected(screen.screenName)}
          />
        ))}
      </div>
    </div>
  )
}

export default BottomNavigationBar
