import RootAppBar from './RootAppBar.tsx'
import BottomNavigationBar from './BottomNavigationBar/BottomNavigationBar.tsx'
import { AppScreen } from './MobileLayout.tsx'
import React from 'react'

type RootScaffoldProps = {
  screenSelected: AppScreen
  setScreenSelected: React.Dispatch<React.SetStateAction<AppScreen>>
  children?: React.ReactNode
}

function RootScaffold(props: RootScaffoldProps) {
  return (
    <>
      <RootAppBar />
      <div className="min-h-0 flex-1 flex flex-col">{props.children}</div>
      <BottomNavigationBar
        screenSelected={props.screenSelected}
        setScreenSelected={props.setScreenSelected}
      />
    </>
  )
}

export default RootScaffold
