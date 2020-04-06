import {createStore, combineReducers, applyMiddleware, Store} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'


import {gameState, socket, clientInfo, tablePosition} from './reducers';
import {socketEmitterMiddleware, normalizeEmittedPositionToTable} from './middlewares';

const rootReducer = combineReducers({
    gameState,
    socket,
    clientInfo,
    tablePosition
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, composeWithDevTools(
    // Normalize before emitting!
    applyMiddleware(thunk, normalizeEmittedPositionToTable, socketEmitterMiddleware)
));