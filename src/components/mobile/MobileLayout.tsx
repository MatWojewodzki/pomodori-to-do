import { useState } from 'react'
import classNames from 'classnames'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import TodoListsScreen from './TodoListsScreen.tsx'
import RootScaffold from './RootScaffold.tsx'
import PomodoroScreen from './PomodoroScreen.tsx'

export type AppScreen = 'todos' | 'timer'

type MobileLayoutProps = {
  todoLists: TodoListDto[]
}

function MobileLayout(props: MobileLayoutProps) {
  const [screenSelected, setScreenSelected] = useState<AppScreen>('timer')
  return (
    <div
      className={classNames(
        'w-screen h-screen flex flex-col bg-neutral-800 text-white'
      )}
    >
      <RootScaffold
        screenSelected={screenSelected}
        setScreenSelected={setScreenSelected}
      >
        {screenSelected === 'todos' && (
          <TodoListsScreen
            screenSelected={screenSelected}
            setScreenSelected={setScreenSelected}
            todoLists={props.todoLists}
          />
        )}
        {screenSelected === 'timer' && <PomodoroScreen />}
      </RootScaffold>
    </div>
  )
}

export default MobileLayout
