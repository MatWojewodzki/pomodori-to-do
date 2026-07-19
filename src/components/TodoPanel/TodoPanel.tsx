import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import TodoCreationForm from './TodoCreationForm.tsx'
import Todos from './Todos.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import DropdownMenu from '../common/DropdownMenu/DropdownMenu.tsx'
import PanelTitle from '../Panel/PanelTitle.tsx'
import classNames from 'classnames'

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
      <PanelHeader>
        <PanelTitle>{props.todoList.title}</PanelTitle>
        <DropdownMenu
          tooltipText="More options"
          triggerLabel="Open menu"
          triggerClassName={classNames(
            'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
          )}
        ></DropdownMenu>
      </PanelHeader>
      <TodoCreationForm todoListId={props.todoList.id} />
      <Todos todoListId={props.todoList.id} />
    </Panel>
  )
}

export default TodoPanel
