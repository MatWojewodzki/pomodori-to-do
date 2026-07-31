import React, { useState } from 'react'
import SettingsButton from '../Settings/SettingsButton.tsx'
import TodoListMenuButton from './TodoListMenuButton.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import AddTodoListButton from './AddTodoListButton.tsx'
import LeftMenuExpandButton from './LeftMenuExpandButton.tsx'
import classNames from 'classnames'

type LeftMenuProps = {
  todoLists: TodoListDto[]
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function LeftMenu(props: LeftMenuProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className={classNames('flex flex-col px-1 py-2', {
        'max-w-9': !expanded,
      })}
    >
      <div className="mb-2 flex justify-end">
        <LeftMenuExpandButton expanded={expanded} setExpanded={setExpanded} />
      </div>
      <div className="flex flex-col gap-1">
        {props.todoLists.map((todoList) => (
          <TodoListMenuButton
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
        <SettingsButton expanded={expanded} />
      </div>
    </div>
  )
}

export default LeftMenu
