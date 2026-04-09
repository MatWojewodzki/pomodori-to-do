import { useQuery } from '@tanstack/react-query'
import todoApi from '../../api/todo.ts'
import TodoListItem from './TodoListItem.tsx'

function TodoList() {
    const result = useQuery({
        queryKey: ['todos'],
        queryFn: todoApi.getTodos,
    })
    if (!result.isSuccess) return
    if (result.data.length > 0) {
        return (
            <ul className="px-5 flex flex-col overflow-y-auto">
                {result.data.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))}
            </ul>
        )
    } else {
        return (
            <div className="grow flex items-center justify-center">
                <p className="text-neutral-300 text-sm text-center">
                    No todos yet
                </p>
            </div>
        )
    }
}

export default TodoList
