import React from 'react'
import SettingsButton from '../Settings/SettingsButton.tsx'
import { useQuery } from '@tanstack/react-query'
import todoListService from '../../services/tauri/todoList.ts'
import ErrorMessage from '../common/ErrorMessage.tsx'
import TodoListMenuButton from './TodoListMenuButton.tsx'

type LeftMenuProps = {
  openTodoListId: string | null
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function LeftMenu(props: LeftMenuProps) {
  const result = useQuery({
    queryKey: ['todo-lists'],
    queryFn: todoListService.getTodoLists,
  })

  if (result.isError) return <ErrorMessage text="Failed to load todo lists." />
  if (!result.isSuccess) return
  return (
    <div className="flex flex-col px-1 py-2">
      <div className="grow">
        {result.data.map((todoList) => (
          <TodoListMenuButton
            key={todoList.id}
            todoList={todoList}
            openTodoListId={props.openTodoListId}
            setOpenTodoListId={props.setOpenTodoListId}
          />
        ))}
      </div>
      <div>
        <SettingsButton />
      </div>
    </div>
  )
}

export default LeftMenu
