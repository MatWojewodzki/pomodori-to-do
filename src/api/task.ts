import { tauriInvoke } from './core.ts'
import { TaskDto } from '../types/generated/TaskDto.ts'

const taskApi = {
    async getTasks(): Promise<TaskDto[]> {
        return await tauriInvoke('get_tasks')
    },

    async createTask(args: {
        text: string
        pomodoroTotal: number
    }): Promise<void> {
        return await tauriInvoke('create_task', args)
    },

    async updateTask(args: { updatedTask: TaskDto }): Promise<void> {
        return await tauriInvoke('update_task', args)
    },

    async deleteTask(args: { id: string }): Promise<void> {
        return await tauriInvoke('delete_task', args)
    },
}

export default taskApi
