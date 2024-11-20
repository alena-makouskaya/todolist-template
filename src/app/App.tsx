import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./Main";
import { LinearProgress } from "../common/components/LinearProgress/LinearProgress";
import { AppRootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import { RequestStatus } from "./app-reducer";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const dispatch = useAppDispatch();

  const appStatus = useSelector<AppRootState, RequestStatus>(
    (state) => state.app.status
  );

  return (
    <div className="App">
      {appStatus === "loading" && <LinearProgress />}
      <ErrorSnackbar />

      <Main />
    </div>
  );
}

export default App;
