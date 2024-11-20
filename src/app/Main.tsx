// @flow
import * as React from "react";
import { Todolists } from "../featutes/ui/Todolists/Todolists";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "./store";
import { createTodolistTC } from "../featutes/model/todolists-reducer";
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan";
type Props = {};
export const Main = (props: Props) => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <div className="main">
      <AddItemForm label={"Todolist title"} callBack={createTodolist} />
      <Todolists />
    </div>
  );
};
