import classNames from 'classnames'
import { TodoDto } from '../../types/generated/TodoDto.ts'

export type TodoItemProps = {
    todo: TodoDto
}

function TodoItem(props: TodoItemProps) {
    const todo = props.todo
    return (
        <li className={classNames({ 'line-through': todo.completed })}>
            {todo.text}
        </li>
    )
}

export default TodoItem
