import { instance } from "../../common/instance/instance"
import { BaseRespone } from "../../common/types/types"
import { GetTasksResponce, TaskType, UpdateTaskModelType } from "./tasksAPI.types"

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponce>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<BaseRespone<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseRespone>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseRespone<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}