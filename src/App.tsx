import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom"
import { TableApp } from "./views/TableApp";

export const App = () => {
    
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={"/"} component={TableApp} />
            </Switch>
        </BrowserRouter>
        </>)
}
