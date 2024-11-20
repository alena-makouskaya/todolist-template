// @flow
import * as React from "react";
import {
  deleteTodolistTC,
  TodolistDomainType,
  updateTodolistTC,
} from "../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../app/store";
import { EditableSpan } from "../../../../../common/components/EditableSpan/EditableSpan";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC(todolist.id));
  };

  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTC(todolist.id, title));
  };

  return (
    <div className="todolistTitle">
      <h3>
        <EditableSpan value={todolist.title} callBack={updateTodolist} />
      </h3>
      <button className="errorButton" onClick={deleteTodolist}>
        {" "}
        x{" "}
      </button>
    </div>
  );
};
