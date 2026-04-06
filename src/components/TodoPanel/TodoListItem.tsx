import classNames from 'classnames'
import { TodoDto } from '../../types/generated/TodoDto.ts'
import CheckBox from '../../assets/icons/check_box_22dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import CheckBoxOutlineBlank from '../../assets/icons/check_box_outline_blank_22dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import todoApi from '../../api/todo.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export type TodoListItemProps = {
    todo: TodoDto
}

function TodoListItem(props: TodoListItemProps) {
    const todo = props.todo

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: todoApi.setCompleted,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const checkBoxTooltip = todo.completed
        ? 'Mark as incomplete'
        : 'Mark as complete'
    return (
        <li
            className={classNames(
                'flex items-start gap-2 px-2 py-1 rounded-md hover:bg-neutral-600',
                { 'line-through': todo.completed }
            )}
        >
            <button
                className="shrink-0 p-1 rounded-md hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700"
                onClick={() => {
                    mutation.mutate({ id: todo.id, completed: !todo.completed })
                }}
                aria-label={checkBoxTooltip}
            >
                {todo.completed ? (
                    <CheckBox className="size-5.5" />
                ) : (
                    <CheckBoxOutlineBlank className="size-5.5" />
                )}
            </button>
            <span className="pt-1">{todo.text}</span>
        </li>
    )
}

export default TodoListItem
