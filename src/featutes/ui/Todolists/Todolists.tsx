// @flow
import * as React from "react";
import { Todolist } from "./Todolist/Todolist";
type Props = {};
export const Todolists = (props: Props) => {
  return (
    <div className="todolists">
      <Todolist />
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  );
};
