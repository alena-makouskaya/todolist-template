// @flow
import * as React from "react";
type Props = {
  value: string;
  callBack: (value: string) => void;
};
export const EditableSpan = ({ value, callBack }: Props) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const activateEditModeHandler = () => {
    setEditMode(true);
    setInputValue(value);
  };

  const activateViewModeHandler = () => {
    setEditMode(false);
    callBack(inputValue);
  };

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewModeHandler();
    }
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={inputValue}
          onChange={changeInputValueHandler}
          onKeyDown={onKeyPressHandler}
          onBlur={activateViewModeHandler}
          className="editableSpan"
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </div>
  );
};
