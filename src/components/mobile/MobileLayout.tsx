import { useState } from 'react'
import BottomNavigationBar from './BottomNavigationBar/BottomNavigationBar.tsx'
import classNames from 'classnames'
import AppBar from './AppBar/AppBar.tsx'

export type Screen = 'todos' | 'timer' | 'settings'

function MobileLayout() {
  const [screenSelected, setScreenSelected] = useState<Screen>('timer')
  return (
    <div
      className={classNames(
        'w-screen h-screen flex flex-col bg-neutral-800 text-white'
      )}
    >
      <AppBar
        screenSelected={screenSelected}
        setScreenSelected={setScreenSelected}
      />
      <div className="grow">{screenSelected}</div>
      <BottomNavigationBar
        screenSelected={screenSelected}
        setScreenSelected={setScreenSelected}
      />
    </div>
  )
}

export default MobileLayout
