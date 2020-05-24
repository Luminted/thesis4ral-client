import React from 'react';
import './App.css';
import {useDispatch} from 'react-redux'

import {TableApp} from './components/table-app/TableApp';
import { useTypedSelector } from './store';
import { selectTableConnectionStatus, selectOwnClientInfo } from './selectors';
import { socketConnect, socketJoinTable, socketGetTableDimensions } from './actions/socketActions';
import { SocketConnectionStatuses, Orientations } from './types/additionalTypes';
import { mirrorVerbPositionMiddleware } from './middlewares/';
import { readyTable } from './actions/thunks';

export function App() {
    
    return (
        <div className='app'>
            <TableApp></TableApp>
        </div>)
}
