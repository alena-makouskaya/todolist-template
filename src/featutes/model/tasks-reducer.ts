import { store } from './../../app/store';
// initial state

import { Dispatch } from "redux";
import { TaskType, UpdateDomainTaskModelType, UpdateTaskModelType } from "../api/tasksAPI.types";
import {
  CreateTodolistActionType,
  DeleteTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { tasksAPI } from "../api/tasksAPI";
import { AppRootState } from "../../app/store";

export const initialState: InitialTaskStateType = {};

// reducer
export const tasksReducer = (
  state: InitialTaskStateType = initialState,
  action: ActionsType
): InitialTaskStateType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      let stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;

    case "CREATE-TODOLIST":
      return { ...state, [action.todolist.id]: [] };

    case "DELETE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TASKS":
      return { ...state, [action.todolistId]: [...action.tasks] };

    case "CREATE-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "DELETE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };

    default:
      return state;
  }
};

// types

type ActionsType =
  | SetTodolistsActionType
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | SetTasksActionType
  | CreateTaskActionType
  | DeleteTaskActionType
  | UpdateTaskActionType;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type CreateTaskActionType = ReturnType<typeof createTaskAC>;
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

export type InitialTaskStateType = {
  [key: string]: Array<TaskType>;
};

// action creators
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const);

export const createTaskAC = (task: TaskType) =>
  ({ type: "CREATE-TASK", task } as const);

export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "DELETE-TASK", todolistId, taskId } as const);

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: "UPDATE-TASK", todolistId, taskId, model } as const);

// thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksAPI.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(todolistId, res.data.items));
  });
};

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
      dispatch(createTaskAC(res.data.data.item));
    });
  };

export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(deleteTaskAC(todolistId, taskId));
    });
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootState) => {

    const state = getState();

    const task = state.tasks[todolistId].find((task) => task.id === taskId)

    if (!task) {
      throw new Error("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...model
    };


    tasksAPI.updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        dispatch(updateTaskAC(todolistId, taskId, apiModel))
      })

  };
