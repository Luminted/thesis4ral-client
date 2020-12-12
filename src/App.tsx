import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { TableApp } from "./views/TableApp";
import {ToastContainer} from "react-toastify";

export const App = () => {
  return (
    <>
{/* TODO: move toast config here */}
    <ToastContainer/>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"} component={TableApp} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
