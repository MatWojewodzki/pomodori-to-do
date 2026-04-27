import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskApi from '../../../api/task.ts'

type TaskCreationFormProps = {
    closeForm: () => void
}

function TaskCreationForm(props: TaskCreationFormProps) {
    const [taskDescription, setTaskDescription] = useState('')
    const [totalPomodoriCount, setTotalPomodoriCount] = useState(1)
    const taskDescriptionInputRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: taskApi.createTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] })
            setTaskDescription('')
            setTotalPomodoriCount(1)
        },
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (taskDescription.trim() === '') return
        mutation.mutate({
            text: taskDescription.trim(),
            pomodoroTotal: totalPomodoriCount,
        })
    }

    useEffect(() => {
        taskDescriptionInputRef.current?.focus()
    }, [])

    return (
        <form
            className="flex-1 mt-3 p-4 flex flex-col rounded-md bg-neutral-600"
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="task-description-input"
                className="text-sm text-neutral-200"
            >
                Task description
            </label>
            <input
                id="task-description-input"
                type="text"
                className={classNames(
                    'mt-1 px-2 py-2 rounded-md bg-neutral-700 ',
                    'focus-visible:outline-2 outline-white'
                )}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                ref={taskDescriptionInputRef}
            />
            <label
                htmlFor="total-pomodori-count-spinbutton"
                className="mt-6 ps-1 text-sm text-neutral-200"
            >
                Total pomodori to finish
            </label>
            <div className="mt-1 flex justify-start">
                <div
                    id="total-pomodori-count-spinbutton"
                    role="spinbutton"
                    aria-valuenow={totalPomodoriCount}
                    aria-valuemin={1}
                    aria-live="polite"
                    className="flex rounded-md bg-neutral-700"
                >
                    <button
                        aria-label="decrease"
                        type="button"
                        className={classNames(
                            'px-4 py-2 text-xl font-bold rounded-s-md',
                            'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500'
                        )}
                        onClick={() => {
                            if (totalPomodoriCount > 1)
                                setTotalPomodoriCount(totalPomodoriCount - 1)
                        }}
                    >
                        -
                    </button>
                    <span className="w-12 py-2 flex justify-center items-center ">
                        {totalPomodoriCount}
                    </span>
                    <button
                        aria-label="increase"
                        type="button"
                        className={classNames(
                            'px-4 py-2 text-xl font-bold rounded-e-md',
                            'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500'
                        )}
                        onClick={() =>
                            setTotalPomodoriCount(totalPomodoriCount + 1)
                        }
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={props.closeForm}
                    className={classNames(
                        'px-4 py-1 text-sm rounded-sm border-2 border-white',
                        'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200',
                        'hover:border-neutral-200 focus-visible:border-neutral-200 hover:text-black focus-visible:text-black'
                    )}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={classNames(
                        'px-4 py-1 text-sm rounded-sm bg-white text-black',
                        'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200'
                    )}
                >
                    Add
                </button>
            </div>
        </form>
    )
}

export default TaskCreationForm
