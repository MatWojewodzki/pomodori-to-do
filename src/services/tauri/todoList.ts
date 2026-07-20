import { tauriInvoke } from './core.ts'
import { TodoListDto } from '../../types/generated/TodoListDto.ts'

const todoListService = {
  async getTodoLists(): Promise<TodoListDto[]> {
    return await tauriInvoke('get_todo_lists')
  },

  async createTodoList(args: { title: string }): Promise<TodoListDto> {
    return await tauriInvoke('create_todo_list', args)
  },

  async moveTodoList(args: {
    initialIndex: number
    newIndex: number
  }): Promise<void> {
    return await tauriInvoke('move_todo_list', args)
  },

  async deleteTodoList(args: { id: string }): Promise<void> {
    return await tauriInvoke('delete_todo_list', args)
  },
}

export default todoListService
