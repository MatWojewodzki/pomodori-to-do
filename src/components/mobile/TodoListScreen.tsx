import React from 'react'
import AppBar from './AppBar/AppBar.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import BackButton from './AppBar/BackButton.tsx'
import TodoListDropdownMenu from '../common/todoList/TodoListDropdownMenu.tsx'
import Todos from '../common/todoList/Todos.tsx'
import TodoCreationForm from '../common/todoList/TodoCreationForm.tsx'
import classNames from 'classnames'

type TodoListScreenProps = {
  todoLists: TodoListDto[]
  todoList: TodoListDto
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListScreen(props: TodoListScreenProps) {
  return (
    <>
      <AppBar
        leading={<BackButton onClick={() => props.setOpenTodoListId(null)} />}
        title={
          <h2 className="flex items-center text-lg">{props.todoList.title}</h2>
        }
        actions={[
          <TodoListDropdownMenu
            todoLists={props.todoLists}
            todoList={props.todoList}
            setOpenTodoListId={props.setOpenTodoListId}
            triggerIconSize={24}
          />,
        ]}
      />
      <div className="min-h-0 flex-1 flex flex-col pb-[env(safe-area-inset-bottom)]">
        <div
          className={classNames(
            'ps-2 pe-1 py-2 grow flex',
            'overflow-y-auto scrollbar-gutter-stable'
          )}
        >
          <Todos todoListId={props.todoList.id} />
        </div>
        <div className="px-2 pb-2">
          <TodoCreationForm todoListId={props.todoList.id} />
        </div>
      </div>
    </>
  )
}

export default TodoListScreen
