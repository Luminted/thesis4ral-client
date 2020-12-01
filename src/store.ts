import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dynamicMiddlewares from 'redux-dynamic-middlewares'
import {gameState, clientInfo, tablePosition, tableConnectionStatus, horizontalScalingRatio, verticalScalingRatio, tablePixelDimensions, grabbedEntityInfo} from './reducers';
import {createTableSocketMiddleware, normalizeVerbPositionMiddleware, upscaleVerbPositionMiddleware } from './middlewares/';
import { tableSocket } from './socket';

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

export type TRootState = ReturnType<typeof rootReducer>;

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