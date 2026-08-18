import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar.tsx'
import TodoPanel from '../TodoPanel/TodoPanel.tsx'
import PanelGap from './PanelGap.tsx'
import PomodoroPanel from '../PomodoroPanel/PomodoroPanel.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import classNames from 'classnames'

type DesktopLayoutProps = {
  todoLists: TodoListDto[]
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
  openTodoList: TodoListDto | null
}

function DesktopLayout(props: DesktopLayoutProps) {
  const [todoPanelWidth, setTodoPanelWidth] = useState(400)
  return (
    <div
      className={classNames(
        'w-screen h-screen flex items-stretch bg-neutral-700 text-white'
      )}
    >
      <Sidebar
        todoLists={props.todoLists}
        openTodoListId={props.openTodoListId}
        setOpenTodoListId={props.setOpenTodoListId}
      />
      <div className="grow flex items-stretch overflow-hidden">
        {props.openTodoList && (
          <TodoPanel
            width={todoPanelWidth}
            todoLists={props.todoLists}
            todoList={props.openTodoList}
            setOpenTodoListId={props.setOpenTodoListId}
          />
        )}
        {props.openTodoList && (
          <PanelGap setTodoPanelWidth={setTodoPanelWidth} />
        )}
        <PomodoroPanel isTodoPanelOpen={props.openTodoList !== null} />
      </div>
    </div>
  )
}

export default DesktopLayout
