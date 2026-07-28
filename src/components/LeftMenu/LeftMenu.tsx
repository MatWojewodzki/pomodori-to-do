import React from 'react'
import SettingsButton from '../Settings/SettingsButton.tsx'
import TodoListMenuButton from './TodoListMenuButton.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import AddTodoListButton from './AddTodoListButton.tsx'

type LeftMenuProps = {
  todoLists: TodoListDto[]
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function LeftMenu(props: LeftMenuProps) {
  return (
    <div className="flex flex-col px-1 py-2">
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
      <div className="grow">
        <AddTodoListButton setOpenTodoListId={props.setOpenTodoListId} />
      </div>
      <div>
        <SettingsButton />
      </div>
    </div>
  )
}

export default LeftMenu
