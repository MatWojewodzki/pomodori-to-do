import { tauriInvoke } from './core.ts'
import type { TodoDto } from '../types/generated/TodoDto.ts'
import type { CreateTodoDto } from '../types/generated/CreateTodoDto.ts'

const todoApi = {
    async getTodos(): Promise<TodoDto[]> {
        return await tauriInvoke('get_todos')
    },

    async createTodo(args: CreateTodoDto): Promise<TodoDto> {
        return await tauriInvoke('create_todo', args)
    },

    async deleteTodo(args: { id: string }): Promise<void> {
        return await tauriInvoke('delete_todo', args)
    },

    async setCompleted(args: {
        id: String
        completed: boolean
    }): Promise<void> {
        return await tauriInvoke('set_completed', args)
    },
}

export default todoApi
