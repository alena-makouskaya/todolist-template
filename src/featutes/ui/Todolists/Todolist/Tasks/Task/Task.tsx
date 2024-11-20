// @flow
import * as React from "react";
import { TodolistDomainType } from "../../../../../model/todolists-reducer";
import { TaskType } from "../../../../../api/tasksAPI.types";
import { useAppDispatch } from "../../../../../../app/store";
import { deleteTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer";
import { TaskStatus } from "../../../../../../common/enums/enums";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";

type Props = {
  todolist: TodolistDomainType;
  task: TaskType;
};

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskTC(todolist.id, task.id));
  };

  const updateTask = (title: string) => {
    dispatch(updateTaskTC(todolist.id, task.id, { title: title }));
  };

  const changetaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    dispatch(updateTaskTC(todolist.id, task.id, { status: value }));
  }

  return (
    <div className="task">
      <div className="taskInput">
        <input
          type="checkbox"
          className="taskCheckbox"
          onChange={changetaskStatus}
          checked={task.status === TaskStatus.Completed ? true : false}
        />
        <EditableSpan value={task.title} callBack={updateTask} />
      </div>
      <button className="errorButton" onClick={deleteTask}>
        {" "}
        x{" "}
      </button>
    </div>
  );
};
