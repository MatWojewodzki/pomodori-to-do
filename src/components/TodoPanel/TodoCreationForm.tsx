import React, { useState } from 'react'
import AddIcon from '../../assets/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import Tooltip from '../Tooltip.tsx'
import classNames from 'classnames'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import todoApi from '../../api/todo.ts'

function TodoCreationForm() {
    const [text, setText] = useState('')

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: todoApi.createTodo,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos'] })
            setText('')
        },
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const todo = text.trim()
        if (todo === '') return
        mutation.mutate({ text: todo })
    }

    return (
        <form className="flex gap-4 w-full mb-4" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="addTodoInput">
                Todo text
            </label>
            <input
                id="addTodoInput"
                type="text"
                placeholder="Add a todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={classNames(
                    'grow px-2 text-white',
                    'rounded-md bg-neutral-600 active:outline-1 outline-neutral-600'
                )}
                autoComplete="off"
            />
            <button className="rounded-sm hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700">
                <Tooltip text="Add a todo">
                    <AddIcon className="size-6" />
                </Tooltip>
            </button>
        </form>
    )
}

export default TodoCreationForm
