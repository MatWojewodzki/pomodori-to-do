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
            <ul className="flex flex-col ps-2">
                {result.data.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))}
            </ul>
        )
    } else {
        return (
            <p className="text-neutral-200 text-sm text-center">No todos yet</p>
        )
    }
}

export default TodoList
