import React from 'react'
import classNames from 'classnames'
import NavigationButton from './NavigationButton.tsx'
import TimerIcon from '../../../../assets/icons/timer_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import ListIcon from '../../../../assets/icons/list_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import { Screen } from '../MobileLayout.tsx'

type BottomNavigationBarProps = {
  screenSelected: Screen
  setScreenSelected: React.Dispatch<React.SetStateAction<Screen>>
}

function BottomNavigationBar(props: BottomNavigationBarProps) {
  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div
        className={classNames(
          'p-4 flex items-center justify-around bg-neutral-800'
        )}
      >
        <NavigationButton
          icon={<ListIcon className="size-6" />}
          text="Todos"
          isSelected={props.screenSelected === 'todos'}
          select={() => props.setScreenSelected('todos')}
        />
        <NavigationButton
          icon={<TimerIcon className="size-6" />}
          text="Timer"
          isSelected={props.screenSelected === 'timer'}
          select={() => props.setScreenSelected('timer')}
        />
      </div>
    </div>
  )
}

export default BottomNavigationBar
