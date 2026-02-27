import PanelHeader from './PanelHeader'
import Panel from './Panel.tsx'

type TodoPanelProps = {
    width: number
}

function TodoPanel(props: TodoPanelProps) {
    return (
        <Panel style={{ width: `${props.width}px` }} className="rounded-e-lg">
            <PanelHeader>To-do List</PanelHeader>
        </Panel>
    )
}

export default TodoPanel
