import React, { useState } from 'react'
import SettingsSidebarButton from './SettingsSidebarButton.tsx'
import TodoListSidebarButton from './TodoListSidebarButton.tsx'
import { TodoListDto } from '../../../types/generated/TodoListDto.ts'
import AddTodoListButton from './AddTodoListButton.tsx'
import SidebarExpandButton from './SidebarExpandButton.tsx'
import classNames from 'classnames'

type SidebarProps = {
  todoLists: TodoListDto[]
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function Sidebar(props: SidebarProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className={classNames('flex flex-col px-1 py-2', {
        'max-w-9': !expanded,
      })}
    >
      <div className="mb-2 flex justify-end">
        <SidebarExpandButton expanded={expanded} setExpanded={setExpanded} />
      </div>
      <div className="flex flex-col gap-1">
        {props.todoLists.map((todoList) => (
          <TodoListSidebarButton
            key={todoList.id}
            todoList={todoList}
            openTodoListId={props.openTodoListId}
            setOpenTodoListId={props.setOpenTodoListId}
          />
        ))}
      </div>
      <div className="h-0.5 my-2 mx-1 bg-neutral-500" />
      <div className="grow flex flex-col">
        <AddTodoListButton
          expanded={expanded}
          setOpenTodoListId={props.setOpenTodoListId}
        />
      </div>
      <div className="flex flex-col">
        <SettingsSidebarButton expanded={expanded} />
      </div>
    </div>
  )
}

export default Sidebar
