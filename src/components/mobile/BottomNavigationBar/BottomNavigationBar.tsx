import React from 'react'
import classNames from 'classnames'
import NavigationButton from './NavigationButton.tsx'
import TimerIcon from '../../../assets/icons/timer_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import ListIcon from '../../../assets/icons/list_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import TimerFillIcon from '../../../assets/icons/timer_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg?react'
import ListFillIcon from '../../../assets/icons/list_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg?react'
import { AppScreen } from '../MobileLayout.tsx'

type BottomNavigationBarProps = {
  screenSelected: AppScreen
  setScreenSelected: React.Dispatch<React.SetStateAction<AppScreen>>
}

function BottomNavigationBar(props: BottomNavigationBarProps) {
  const navigationButtons: {
    screen: AppScreen
    text: string
    icon: React.ReactElement
    fillIcon: React.ReactElement
  }[] = [
    {
      screen: 'timer',
      text: 'Timer & Tasks',
      icon: <TimerIcon className="size-6" />,
      fillIcon: <TimerFillIcon className="size-6" />,
    },
    {
      screen: 'todos',
      text: 'Todo lists',
      icon: <ListIcon className="size-6" />,
      fillIcon: <ListFillIcon className="size-6" />,
    },
  ]
  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div
        className={classNames(
          'px-4 py-1 flex items-center justify-around bg-neutral-700'
        )}
      >
        {navigationButtons.map((screen, idx) => (
          <NavigationButton
            key={idx}
            text={screen.text}
            icon={screen.icon}
            selectedIcon={screen.fillIcon}
            isSelected={props.screenSelected === screen.screen}
            select={() => props.setScreenSelected(screen.screen)}
          />
        ))}
      </div>
    </div>
  )
}

export default BottomNavigationBar
