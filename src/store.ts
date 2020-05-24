import SocketIOClient from 'socket.io-client';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dynamicMiddlewares from 'redux-dynamic-middlewares'

import {gameState, clientInfo, tablePosition, tableConnectionStatus, tableReady, horizontalScalingRatio, verticalScalingRatio, tableVirtualDimensions} from './reducers';
import {createTableSocketMiddleware, normalizeVerbPositionMiddleware, } from './middlewares/';
import { upscale } from './utils';
import { upscaleVerbPositionMiddleware } from './middlewares/upscale-verb-position/upscaleVerbPositionMiddleware';

const rootReducer = combineReducers({
    gameState,
    clientInfo,
    tablePosition,
    tableConnectionStatus,
    tableReady,
    horizontalScalingRatio,
    verticalScalingRatio,
    tableVirtualDimensions
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const port = process.env.REACT_APP_SERVER_PORT;
const host = process.env.REACT_APP_SERVER_HOST;
const tableNamespace = '/table'
const serverURL = `http://${host}:${port}${tableNamespace}`
const socket = SocketIOClient(serverURL, {
    query: {
        tableId: 'dev'
    }
})
const tableSocketMiddleware = createTableSocketMiddleware(socket);

export const store = createStore(rootReducer, composeWithDevTools(
    // Order is important
    applyMiddleware(
        thunk,
        normalizeVerbPositionMiddleware,
        dynamicMiddlewares,
        upscaleVerbPositionMiddleware,
        tableSocketMiddleware)
));