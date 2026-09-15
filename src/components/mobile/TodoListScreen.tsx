import React from 'react'
import AppBar from './AppBar/AppBar.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import BackButton from './AppBar/BackButton.tsx'
import TodoListDropdownMenu from '../common/TodoListView/TodoListDropdownMenu.tsx'
import Todos from '../common/TodoListView/Todos.tsx'
import TodoCreationForm from '../common/TodoListView/TodoCreationForm.tsx'

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
      <div className="min-h-0 flex-1 flex flex-col pt-6">
        <div className="grow overflow-y-auto scrollbar-gutter-stable">
          <Todos todoListId={props.todoList.id} />
        </div>
        <TodoCreationForm todoListId={props.todoList.id} />
      </div>
    </>
  )
}

export default TodoListScreen
