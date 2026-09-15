import React, { useState } from 'react'
import classNames from 'classnames'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import TodoListsScreen from './TodoListsScreen.tsx'
import RootScaffold from './RootScaffold.tsx'
import PomodoroScreen from './PomodoroScreen.tsx'
import TodoListScreen from './TodoListScreen.tsx'

export type AppScreen = 'todos' | 'timer'

type MobileLayoutProps = {
  todoLists: TodoListDto[]
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
  openTodoList: TodoListDto | null
}

function MobileLayout(props: MobileLayoutProps) {
  const [screenSelected, setScreenSelected] = useState<AppScreen>(
    props.openTodoListId ? 'todos' : 'timer'
  )
  return (
    <div
      className={classNames(
        'w-screen h-screen flex flex-col bg-neutral-800 text-white'
      )}
    >
      {props.openTodoList ? (
        <TodoListScreen
          todoLists={props.todoLists}
          todoList={props.openTodoList}
          setOpenTodoListId={props.setOpenTodoListId}
        />
      ) : (
        <RootScaffold
          screenSelected={screenSelected}
          setScreenSelected={setScreenSelected}
        >
          {screenSelected === 'todos' && (
            <TodoListsScreen
              screenSelected={screenSelected}
              setScreenSelected={setScreenSelected}
              todoLists={props.todoLists}
              setOpenTodoListId={props.setOpenTodoListId}
            />
          )}
          {screenSelected === 'timer' && <PomodoroScreen />}
        </RootScaffold>
      )}
    </div>
  )
}

export default MobileLayout
