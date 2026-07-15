import React from 'react'
import SettingsButton from '../Settings/SettingsButton.tsx'
import TodoListMenuButton from './TodoListMenuButton.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import AddTodoListButton from './AddTodoListButton.tsx'

type LeftMenuProps = {
  todoLists: TodoListDto[]
  openTodoList: TodoListDto | null
  setOpenTodoList: React.Dispatch<React.SetStateAction<TodoListDto | null>>
}

function LeftMenu(props: LeftMenuProps) {
  return (
    <div className="flex flex-col px-1 py-2">
      <div>
        {props.todoLists.map((todoList) => (
          <TodoListMenuButton
            key={todoList.id}
            todoList={todoList}
            openTodoList={props.openTodoList}
            setOpenTodoList={props.setOpenTodoList}
          />
        ))}
      </div>
      <div className="grow mt-2">
        <AddTodoListButton />
      </div>
      <div>
        <SettingsButton />
      </div>
    </div>
  )
}

export default LeftMenu
