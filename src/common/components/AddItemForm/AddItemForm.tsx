// @flow
import * as React from "react";
type Props = {};
export const AddItemForm = (props: Props) => {
  return (
    <div className="addItemForm">
      <div className="formNav">
        <div className="formInput">
          <label>Label</label>
          <input type="text" />
        </div>

        <button className="formButton"> + </button>
      </div>
      <div className="textError">Error </div>
    </div>
  );
};
