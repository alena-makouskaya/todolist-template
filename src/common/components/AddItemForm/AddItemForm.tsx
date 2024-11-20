// @flow
import * as React from "react";

type Props = {
  label: string
  callBack: (value: string) => void;
};

export const AddItemForm = ({ label, callBack }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    error && setError(null);
  };

  const callBackHandler = () => {
    if (inputValue.trim() !== "") {
      callBack(inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      callBackHandler();
    }
  };

  return (
    <div className="addItemForm">
      <div className="formNav">
        <div className="formInput">
          <label>{label}</label>
          <input
            type="text"
            value={inputValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
          />
        </div>

        <button className="formButton" onClick={callBackHandler}>
          {" "}
          +{" "}
        </button>
      </div>
      {error && <div className="textError">{error}</div>}
    </div>
  );
};
