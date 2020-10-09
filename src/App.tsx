import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom"

import {TableApp} from './components/table-app/TableApp';
import { useTypedSelector } from './store';
import { selectTableConnectionStatus, selectOwnClientInfo } from './selectors';
import { socketConnect, socketJoinTable, socketGetTableDimensions } from './actions/socketActions';
import { SocketConnectionStatuses, Orientations } from './types/additionalTypes';
import { mirrorVerbPositionMiddleware } from './middlewares/';
import { readyTable } from './actions/thunks';

export function App() {
    
    return (
        <BrowserRouter>
            <Switch>
            </Switch>
        </BrowserRouter>)
}
