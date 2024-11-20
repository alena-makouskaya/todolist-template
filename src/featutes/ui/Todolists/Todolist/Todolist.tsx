// @flow
import * as React from "react";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
type Props = {};
export const Todolist = (props: Props) => {
  return (
    <div className="todolist">
      <TodolistTitle />
      <AddItemForm />
      <Tasks />
      <FilterTasksButtons />
    </div>
  );
};
