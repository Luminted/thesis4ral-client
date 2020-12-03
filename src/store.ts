import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import {createTableSocketMiddleware, normalizeVerbPositionMiddleware, upscaleVerbPositionMiddleware } from './middlewares/';
import { tableSocket } from './socket';
import { rootReducer } from './reducers';

const tableSocketMiddleware = createTableSocketMiddleware(tableSocket);

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