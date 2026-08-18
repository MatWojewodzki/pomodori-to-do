import './main.css'
import { useState } from 'react'
import todoListService from './services/tauri/todoList.ts'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './components/common/ErrorMessage.tsx'
import { useMediaQuery } from 'usehooks-ts'
import DesktopLayout from './components/layout/DesktopLayout/DesktopLayout.tsx'

function App() {
  const [openTodoListId, setOpenTodoListId] = useState<string | null>(null)

  const isMobile = useMediaQuery('(max-width: 768px)')

  const result = useQuery({
    queryKey: ['todo-lists'],
    queryFn: todoListService.getTodoLists,
  })

  if (result.isError) return <ErrorMessage text="Failed to load todo lists." />
  if (!result.isSuccess) return

  if (isMobile) {
    return <p>Not implemented</p> // TODO
  } else {
    return (
      <DesktopLayout
        todoLists={result.data}
        openTodoListId={openTodoListId}
        setOpenTodoListId={setOpenTodoListId}
      />
    )
  }
}

export default App
