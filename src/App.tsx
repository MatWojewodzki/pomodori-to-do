import './main.css'
import { useState } from 'react'
import todoListService from './services/tauri/todoList.ts'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './components/common/ErrorMessage.tsx'
import DesktopLayout from './components/desktop/DesktopLayout.tsx'
import MobileLayout from './components/mobile/MobileLayout.tsx'
import isDesktop from './utils/isDesktop.ts'

function App() {
  const [openTodoListId, setOpenTodoListId] = useState<string | null>(null)

  const result = useQuery({
    queryKey: ['todo-lists'],
    queryFn: todoListService.getTodoLists,
  })

  if (result.isError) return <ErrorMessage text="Failed to load todo lists." />
  if (!result.isSuccess) return

  const openTodoList =
    result.data.find((todoList) => todoList.id === openTodoListId) ?? null

  if (isDesktop()) {
    return (
      <DesktopLayout
        todoLists={result.data}
        openTodoListId={openTodoListId}
        setOpenTodoListId={setOpenTodoListId}
        openTodoList={openTodoList}
      />
    )
  } else {
    return (
      <MobileLayout
        todoLists={result.data}
        openTodoListId={openTodoListId}
        setOpenTodoListId={setOpenTodoListId}
        openTodoList={openTodoList}
      />
    )
  }
}

export default App
