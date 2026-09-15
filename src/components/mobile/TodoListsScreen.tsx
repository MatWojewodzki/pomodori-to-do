import React, { useState } from 'react'
import { AppScreen } from './MobileLayout.tsx'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'
import classNames from 'classnames'
import FloatingActionButton from './FloatingActionButton.tsx'
import AddIcon from '../../assets/icons/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import DialogButton from '../common/dialog/DialogButton.tsx'
import TodoListCreationDialog from '../common/todoList/TodoListCreationDialog.tsx'
import ChecklistIcon from '../../assets/icons/checklist_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'

type TodoListsScreenProps = {
  screenSelected: AppScreen
  setScreenSelected: React.Dispatch<React.SetStateAction<AppScreen>>
  todoLists: TodoListDto[]
  setOpenTodoListId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoListsScreen(props: TodoListsScreenProps) {
  const [addTodoListDialogOpen, setAddTodoListDialogOpen] = useState(false)
  return (
    <div className="relative flex flex-col flex-1 min-h-0">
      <ul
        className={classNames(
          'ps-2 pe-1 py-2 min-h-0 flex flex-1 flex-col',
          'overflow-y-auto scrollbar-gutter-stable'
        )}
      >
        {props.todoLists.map((todoList) => (
          <li key={todoList.id} className="flex">
            <button
              className={classNames(
                'p-4 grow flex items-center justify-start gap-4',
                'rounded-md text-lg cursor-pointer',
                'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
              )}
              onClick={() => props.setOpenTodoListId(todoList.id)}
            >
              <ChecklistIcon className="size-6 shrink-0" />
              <span>{todoList.title}</span>
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
