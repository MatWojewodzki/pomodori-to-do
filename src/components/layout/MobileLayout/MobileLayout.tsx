import { useState } from 'react'
import BottomNavigationBar from './BottomNavigationBar/BottomNavigationBar.tsx'
import classNames from 'classnames'

export type Screen = 'todos' | 'timer'

function MobileLayout() {
  const [screenSelected, setScreenSelected] = useState<Screen>('timer')
  return (
    <div
      className={classNames(
        'w-screen h-screen flex flex-col bg-neutral-700 text-white'
      )}
    >
      <div className="grow"></div>
      <BottomNavigationBar
        screenSelected={screenSelected}
        setScreenSelected={setScreenSelected}
      />
    </div>
  )
}

export default MobileLayout
