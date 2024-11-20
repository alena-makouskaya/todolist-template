// @flow
import * as React from "react";
import { Task } from "./Task/Task";
import { TodolistDomainType } from "../../../../model/todolists-reducer";
import { AppRootState, useAppDispatch } from "../../../../../app/store";
import { useSelector } from "react-redux";

import {
  InitialTaskStateType,
  setTasksTC,
} from "../../../../model/tasks-reducer";
import { TaskStatus } from "../../../../../common/enums/enums";
type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const tasks = useSelector<AppRootState, InitialTaskStateType>(
    (state) => state.tasks
  );

  React.useEffect(() => {
    dispatch(setTasksTC(todolist.id));
  }, []);

  const allTasksInTodolist = tasks[todolist.id];

  let filteredTasks = allTasksInTodolist

  if(todolist.filter === "active") {
    filteredTasks = allTasksInTodolist.filter((task) => task.status !== TaskStatus.Completed)
  }

  if(todolist.filter === "completed") {
    filteredTasks = allTasksInTodolist.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <div className="tasks">
      {filteredTasks.map((task) => (
        <Task key={task.id} todolist={todolist} task={task} />
      ))}
    </div>
  );
};
