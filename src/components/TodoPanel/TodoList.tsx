import TodoListItem from './TodoListItem.tsx'
import { TodoDto } from '../../types/generated/TodoDto.ts'
import { useEffect, useRef, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import { useQueryClient } from '@tanstack/react-query'

type TodoListProps = {
  todos: TodoDto[]
}

function TodoList({ todos }: TodoListProps) {
  const [localTodos, setLocalTodos] = useState<TodoDto[]>(todos)
  const isDragging = useRef(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isDragging.current) return
    setLocalTodos(todos)
  }, [todos])

  return (
    <DragDropProvider
      onDragStart={() => (isDragging.current = true)}
      onDragEnd={async (event) => {
        isDragging.current = false

        if (event.canceled) {
          setLocalTodos(todos)
          return
        }

        setLocalTodos((todos) => move(todos, event))
        // TODO: update the database
        await queryClient.invalidateQueries({ queryKey: ['todos'] })
      }}
    >
      <ul className="px-5 flex flex-col overflow-y-auto">
        {localTodos.map((todo, index) => (
          <TodoListItem key={todo.id} todo={todo} index={index} />
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default TodoList
