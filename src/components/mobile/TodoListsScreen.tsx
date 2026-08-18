import React from 'react'
import { AppScreen } from './MobileLayout.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import classNames from 'classnames'

type TodoListsScreenProps = {
  screenSelected: AppScreen
  setScreenSelected: React.Dispatch<React.SetStateAction<AppScreen>>
  todoLists: TodoListDto[]
}

function TodoListsScreen(props: TodoListsScreenProps) {
  return (
    <ul className="mt-2 flex flex-col">
      {props.todoLists.map((todoList) => (
        <li key={todoList.id} className="flex">
          <button
            className={classNames(
              'p-4 grow flex justify-start text-lg cursor-pointer ',
              'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
            )}
          >
            {todoList.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoListsScreen
