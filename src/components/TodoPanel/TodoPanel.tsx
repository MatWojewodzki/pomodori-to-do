import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import TodoItem from './TodoItem.tsx'
import todoApi from '../../api/todo'
import { useQuery } from '@tanstack/react-query'
import TodoCreationForm from './TodoCreationForm.tsx'

type TodoPanelProps = {
    width: number
}

function TodoPanel(props: TodoPanelProps) {
    const result = useQuery({
        queryKey: ['todos'],
        queryFn: todoApi.getTodos,
    })
    return (
        <Panel style={{ width: `${props.width}px` }} className="rounded-e-lg">
            <PanelHeader>To-do List</PanelHeader>
            <TodoCreationForm />
            {result.isSuccess &&
                (result.data.length > 0 ? (
                    <ul className="flex flex-col ps-2 gap-2 list-disc">
                        {result.data.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-neutral-200 text-sm text-center">
                        No todos yet
                    </p>
                ))}
        </Panel>
    )
}

export default TodoPanel
