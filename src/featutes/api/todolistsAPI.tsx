import { instance } from "../../common/instance/instance";
import { BaseRespone } from "../../common/types/types";
import { TodolistType } from "./todolistsAPI.types";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<BaseRespone<{ item: TodolistType }>>(`todo-lists`, {
      title,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<BaseRespone>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string){
    return instance.put<BaseRespone>(`todo-lists/${todolistId}`, {title})
  }
};
