import SocketIOClient from 'socket.io-client';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dynamicMiddlewares from 'redux-dynamic-middlewares'

import {gameState, clientInfo, tablePosition, tableBoundaries, playareaBoundaries, tableConnectionStatus} from './reducers';
import {createTableSocketMiddleware, normalizeVerbPositionMiddleware} from './middlewares/';

const rootReducer = combineReducers({
    gameState,
    clientInfo,
    tablePosition,
    tableBoundaries,
    playareaBoundaries,
    tableConnectionStatus
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const port = process.env.REACT_APP_SERVER_PORT;
const host = process.env.REACT_APP_SERVER_HOST;
const tableNamespace = '/table'
const serverURL = `http://${host}:${port}${tableNamespace}`
const socket = SocketIOClient(serverURL, {
    autoConnect: true,
    query: {
        tableId: 'dev'
    }
})
const tableSocketMiddleware = createTableSocketMiddleware(socket);

export const store = createStore(rootReducer, composeWithDevTools(
    // Normalize before emitting!
    applyMiddleware(
        thunk,
        normalizeVerbPositionMiddleware,
        dynamicMiddlewares,
        tableSocketMiddleware)
));