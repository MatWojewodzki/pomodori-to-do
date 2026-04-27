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
        return await tauriInvoke('create_todo', args)
    },
}

export default taskApi
