import './main.css'
import LeftMenu from './components/layout/LeftMenu.tsx'
import TodoPanel from './components/TodoPanel/TodoPanel.tsx'
import PomodoroPanel from './components/PomodoroPanel/PomodoroPanel.tsx'
import PanelGap from './components/layout/PanelGap.tsx'
import { useState } from 'react'
import classNames from 'classnames'
import todoListService from './services/tauri/todoList.ts'
import { useQuery } from '@tanstack/react-query'
import { TodoListDto } from './types/generated/TodoListDto.ts'
import ErrorMessage from './components/common/ErrorMessage.tsx'

function App() {
  const [todoPanelWidth, setTodoPanelWidth] = useState(400)
  const [openTodoList, setOpenTodoList] = useState<TodoListDto | null>(null)
  const isTodoPanelOpen = openTodoList !== null

  const result = useQuery({
    queryKey: ['todo-lists'],
    queryFn: todoListService.getTodoLists,
  })

  if (result.isError) return <ErrorMessage text="Failed to load todo lists." />
  if (!result.isSuccess) return
  return (
    <div
      className={classNames(
        'w-screen h-screen flex items-stretch bg-neutral-700 text-white'
      )}
    >
      <LeftMenu
        todoLists={result.data}
        openTodoList={openTodoList}
        setOpenTodoList={setOpenTodoList}
      />
      <div className="grow flex items-stretch overflow-hidden">
        {isTodoPanelOpen && (
          <TodoPanel width={todoPanelWidth} todoList={openTodoList} />
        )}
        {isTodoPanelOpen && <PanelGap setTodoPanelWidth={setTodoPanelWidth} />}
        <PomodoroPanel isTodoPanelOpen={isTodoPanelOpen} />
      </div>
    </div>
  )
}

export default App
