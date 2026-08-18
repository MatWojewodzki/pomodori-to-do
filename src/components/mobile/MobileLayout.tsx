import { useState } from 'react'
import BottomNavigationBar from './BottomNavigationBar/BottomNavigationBar.tsx'
import classNames from 'classnames'
import RootAppBar from './RootAppBar.tsx'

export type AppScreen = 'todos' | 'timer' | 'settings'

function MobileLayout() {
  const [screenSelected, setScreenSelected] = useState<AppScreen>('timer')
  return (
    <div
      className={classNames(
        'w-screen h-screen flex flex-col bg-neutral-800 text-white'
      )}
    >
      <RootAppBar setScreenSelected={setScreenSelected} />
      <div className="grow">{screenSelected}</div>
      <BottomNavigationBar
        screenSelected={screenSelected}
        setScreenSelected={setScreenSelected}
      />
    </div>
  )
}

export default MobileLayout
