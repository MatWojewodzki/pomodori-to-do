import './main.css'
import LeftMenu from './components/layout/LeftMenu.tsx'
import TodoPanel from './components/TodoPanel/TodoPanel.tsx'
import PomodoroPanel from './components/PomodoroPanel/PomodoroPanel.tsx'
import PanelGap from './components/layout/PanelGap.tsx'
import { useState } from 'react'
import classNames from 'classnames'
import todoListService from './services/tauri/todoList.ts'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './components/common/ErrorMessage.tsx'

function App() {
  const [todoPanelWidth, setTodoPanelWidth] = useState(400)
  const [openTodoListId, setOpenTodoListId] = useState<string | null>(null)
  console.log('openTodoListId', openTodoListId)

  const result = useQuery({
    queryKey: ['todo-lists'],
    queryFn: todoListService.getTodoLists,
  })

  if (result.isError) return <ErrorMessage text="Failed to load todo lists." />
  if (!result.isSuccess) return

  const openTodoList =
    result.data.find((todoList) => todoList.id === openTodoListId) ?? null
  return (
    <div
      className={classNames(
        'w-screen h-screen flex items-stretch bg-neutral-700 text-white'
      )}
    >
      <LeftMenu
        todoLists={result.data}
        openTodoListId={openTodoListId}
        setOpenTodoListId={setOpenTodoListId}
      />
      <div className="grow flex items-stretch overflow-hidden">
        {openTodoList && (
          <TodoPanel
            width={todoPanelWidth}
            todoList={openTodoList}
            setOpenTodoListId={setOpenTodoListId}
          />
        )}
        {openTodoList && <PanelGap setTodoPanelWidth={setTodoPanelWidth} />}
        <PomodoroPanel isTodoPanelOpen={openTodoList !== null} />
      </div>
    </div>
  )
}

export default App
