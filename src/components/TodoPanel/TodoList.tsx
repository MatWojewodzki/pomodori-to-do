import TodoListItem from './TodoListItem.tsx'
import { TodoDto } from '../../types/generated/TodoDto.ts'

type TodoListProps = {
  todos: TodoDto[]
}

function TodoList(props: TodoListProps) {
  return (
    <ul className="px-5 flex flex-col overflow-y-auto">
      {props.todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
