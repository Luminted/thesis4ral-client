import SocketIOClient from 'socket.io-client';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dynamicMiddlewares from 'redux-dynamic-middlewares'

import {gameState, clientInfo, tablePosition, tableConnectionStatus, horizontalScalingRatio, verticalScalingRatio, tablePixelDimensions, grabbedEntityInfo} from './reducers';
import {createTableSocketMiddleware, normalizeVerbPositionMiddleware, upscaleVerbPositionMiddleware } from './middlewares/';

const rootReducer = combineReducers({
    gameState,
    clientInfo,
    tablePosition,
    tableConnectionStatus,
    horizontalScalingRatio,
    verticalScalingRatio,
    tablePixelDimensions,
    grabbedEntityInfo
});

export type RootState = ReturnType<typeof rootReducer>;

// TODO: clean this up
const port = process.env.REACT_APP_SERVER_PORT;
const host = process.env.REACT_APP_SERVER_HOST;
const tableNamespace = '/table'
const serverURL = `http://${host}:${port}${tableNamespace}`
console.log(`connecting to ${serverURL}`)
const socket = SocketIOClient(serverURL, {
    // TODO: rethink this
    query: {
        tableId: 'dev'
    }
})
const tableSocketMiddleware = createTableSocketMiddleware(socket);

export const store = createStore(rootReducer, composeWithDevTools(
    // Order is important
    applyMiddleware(
        thunk,
        // joinedTableValidator,
        normalizeVerbPositionMiddleware,
        dynamicMiddlewares,
        upscaleVerbPositionMiddleware,
        tableSocketMiddleware)
));