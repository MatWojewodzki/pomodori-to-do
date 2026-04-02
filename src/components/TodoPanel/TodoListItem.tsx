import classNames from 'classnames'
import { TodoDto } from '../../types/generated/TodoDto.ts'

export type TodoListItemProps = {
    todo: TodoDto
}

function TodoListItem(props: TodoListItemProps) {
    const todo = props.todo
    return (
        <li className={classNames({ 'line-through': todo.completed })}>
            {todo.text}
        </li>
    )
}

export default TodoListItem
