import { Dispatch } from "redux";
import { TodolistType } from "../api/todolistsAPI.types";
import { todolistsAPI } from "../api/todolistsAPI";

// initial state
const initialState: Array<TodolistDomainType> = [];

// reducer

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => {
        return { ...tl, filter: "all" };
      });

    case "CREATE-TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state];

    case "DELETE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId);

    case "UPDATE-TODOLIST":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.title } : tl
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

    default:
      return state;
  }
};

// types
type ActionsType =
  | SetTodolistsActionType
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | UpdateTodolistActionType | ChangeTodolistFilterActionType;

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>;
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValueType };

// action creators
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: "CREATE-TODOLIST", todolist } as const);

export const deleteTodolistAC = (todolistId: string) =>
  ({ type: "DELETE-TODOLIST", todolistId } as const);

export const updateTodolistAC = (todolistId: string, title: string) =>
  ({ type: "UPDATE-TODOLIST", todolistId, title } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

// thunks

export const setTodolistsTC = () => (dispath: Dispatch) => {
  todolistsAPI.getTodolists().then((res) => {
    dispath(setTodolistsAC(res.data));
  });
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title).then((res) => {
    dispatch(createTodolistAC(res.data.data.item));
  });
};

export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(deleteTodolistAC(todolistId));
    });
  };

export const updateTodolistTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(updateTodolistAC(todolistId, title));
    });
  };
