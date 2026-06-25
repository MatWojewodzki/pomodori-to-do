import { useQuery } from '@tanstack/react-query'
import todoService from '../../services/tauri/todo.ts'
import ErrorMessage from '../common/ErrorMessage.tsx'
import TodoList from './TodoList.tsx'

function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
  })
  if (result.isError) return <ErrorMessage text="Failed to load todos." />
  if (!result.isSuccess) return
  if (result.data.length > 0) {
    return <TodoList todos={result.data} />
  } else {
    return (
      <div className="grow flex items-center justify-center">
        <p className="text-neutral-300 text-sm text-center">No todos yet</p>
      </div>
    )
  }
}

export default Todos
