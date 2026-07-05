import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import TodoCreationForm from './TodoCreationForm.tsx'
import Todos from './Todos.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'

type TodoPanelProps = {
  width: number
  todoList: TodoListDto
}

function TodoPanel(props: TodoPanelProps) {
  return (
    <Panel
      id="todo-panel"
      style={{ width: `${props.width}px` }}
      className="rounded-e-lg"
    >
      <PanelHeader>{props.todoList.title}</PanelHeader>
      <TodoCreationForm todoListId={props.todoList.id} />
      <Todos todoListId={props.todoList.id} />
    </Panel>
  )
}

export default TodoPanel
