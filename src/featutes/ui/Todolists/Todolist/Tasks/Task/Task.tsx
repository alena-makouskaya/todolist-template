// @flow
import * as React from "react";
type Props = {};
export const Task = (props: Props) => {
  return (
    <div className="task">
      <div className="taskInput">
        <input type="checkbox" />
        <span>Task Title</span>
      </div>
      <button className="errorButton"> x </button>
    </div>
  );
};
