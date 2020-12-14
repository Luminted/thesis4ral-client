import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { TableApp } from "./views/TableApp";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <ToastContainer draggable={false} />
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"} component={TableApp} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
