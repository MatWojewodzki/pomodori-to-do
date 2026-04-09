import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import TodoCreationForm from './TodoCreationForm.tsx'
import TodoList from './TodoList.tsx'

type TodoPanelProps = {
    width: number
}

function TodoPanel(props: TodoPanelProps) {
    return (
        <Panel
            id="todo-panel"
            style={{ width: `${props.width}px` }}
            className="rounded-e-lg"
        >
            <PanelHeader>{'Todo'} List</PanelHeader>
            <TodoCreationForm />
            <TodoList />
        </Panel>
    )
}

export default TodoPanel
