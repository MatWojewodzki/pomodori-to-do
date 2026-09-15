import React, { useState } from 'react'
import { AppScreen } from './MobileLayout.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import classNames from 'classnames'
import FloatingActionButton from './FloatingActionButton.tsx'
import AddIcon from '../../assets/icons/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import DialogButton from '../common/dialog/DialogButton.tsx'
import TodoListCreationDialog from '../common/TodoListView/TodoListCreationDialog.tsx'

type TodoListsScreenProps = {
  screenSelected: AppScreen
  setScreenSelected: React.Dispatch<React.SetStateAction<AppScreen>>
  todoLists: TodoListDto[]
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListsScreen(props: TodoListsScreenProps) {
  const [addTodoListDialogOpen, setAddTodoListDialogOpen] = useState(false)
  return (
    <div className="relative flex-1">
      <ul className="mt-2 flex flex-col">
        {props.todoLists.map((todoList) => (
          <li key={todoList.id} className="flex">
            <button
              className={classNames(
                'p-4 grow flex justify-start text-lg cursor-pointer ',
                'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
              )}
              onClick={() => props.setOpenTodoListId(todoList.id)}
            >
              {todoList.title}
            </button>
          </li>
        ))}
      </ul>
      <DialogButton
        open={addTodoListDialogOpen}
        setOpen={setAddTodoListDialogOpen}
        tooltipEnabled={false}
        dialog={
          <TodoListCreationDialog
            closeDialog={() => setAddTodoListDialogOpen(false)}
            setOpenTodoListId={props.setOpenTodoListId}
          />
        }
      >
        <FloatingActionButton label="Create a new todo list">
          <AddIcon className="size-6" />
        </FloatingActionButton>
      </DialogButton>
    </div>
  )
}

export default TodoListsScreen
