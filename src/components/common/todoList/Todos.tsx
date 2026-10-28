import { useQuery } from '@tanstack/react-query'
import todoService from '../../../services/tauri/todo.ts'
import ErrorMessage from '../ErrorMessage.tsx'
import TodoList from './TodoList.tsx'
import CentralMessage from '../CentralMessage.tsx'

type TodoProps = {
  todoListId: string
}

function Todos(props: TodoProps) {
  const result = useQuery({
    queryKey: ['todos', { todoListId: props.todoListId }],
    queryFn: async () => todoService.getTodos({ todoListId: props.todoListId }),
  })
  if (result.isError) return <ErrorMessage text="Failed to load todos." />
  if (!result.isSuccess) return
  if (result.data.length > 0) {
    return <TodoList todos={result.data} />
  } else {
    return <CentralMessage>No todos yet.</CentralMessage>
  }
}

export default Todos
