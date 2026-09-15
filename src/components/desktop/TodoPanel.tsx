import PanelHeader from './Panel/PanelHeader.tsx'
import Panel from './Panel/Panel.tsx'
import TodoCreationForm from '../common/TodoListView/TodoCreationForm.tsx'
import Todos from '../common/TodoListView/Todos.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import PanelTitle from './Panel/PanelTitle.tsx'
import TodoListDropdownMenu from '../common/TodoListView/TodoListDropdownMenu.tsx'
import React from 'react'

type TodoPanelProps = {
  width: number
  todoLists: TodoListDto[]
  todoList: TodoListDto
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoPanel(props: TodoPanelProps) {
  return (
    <Panel
      id="todo-panel"
      style={{ width: `${props.width}px` }}
      className="rounded-e-lg"
    >
      <PanelHeader>
        <PanelTitle>{props.todoList.title}</PanelTitle>
        <TodoListDropdownMenu
          todoLists={props.todoLists}
          todoList={props.todoList}
          setOpenTodoListId={props.setOpenTodoListId}
        />
      </PanelHeader>
      <div className="px-5 pb-4 flex flex-col gap-4">
        <TodoCreationForm todoListId={props.todoList.id} />
        <Todos todoListId={props.todoList.id} />
      </div>
    </Panel>
  )
}

export default TodoPanel
