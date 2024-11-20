import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { todolistsReducer } from "../featutes/model/todolists-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from 'react-redux';
import { tasksReducer } from "../featutes/model/tasks-reducer";
import { appReducer } from "./app-reducer";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducers>

export const store = legacy_createStore(rootReducers, {}, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;
export const useAppDispatch = useDispatch<AppDispatchType>;

// @ts-ignore
window.store = store;