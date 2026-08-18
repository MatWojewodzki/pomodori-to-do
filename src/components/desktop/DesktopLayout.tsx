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
}

function DesktopLayout(props: DesktopLayoutProps) {
  const [todoPanelWidth, setTodoPanelWidth] = useState(400)
  const openTodoList =
    props.todoLists.find((todoList) => todoList.id === props.openTodoListId) ??
    null
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
        {openTodoList && (
          <TodoPanel
            width={todoPanelWidth}
            todoLists={props.todoLists}
            todoList={openTodoList}
            setOpenTodoListId={props.setOpenTodoListId}
          />
        )}
        {openTodoList && <PanelGap setTodoPanelWidth={setTodoPanelWidth} />}
        <PomodoroPanel isTodoPanelOpen={openTodoList !== null} />
      </div>
    </div>
  )
}

export default DesktopLayout
