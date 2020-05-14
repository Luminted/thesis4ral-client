import {createStore, combineReducers, applyMiddleware, Store} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'


import {gameState, clientInfo, tablePosition, tableBoundaries, playareaBoundaries} from './reducers';

const rootReducer = combineReducers({
    gameState,
    socket,
    clientInfo,
    tablePosition,
    tableBoundaries,
    playareaBoundaries,
    tableConnectionStatus
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, composeWithDevTools(
    // Normalize before emitting!
    applyMiddleware(thunk, normalizeEmittedPositionToTable, socketEmitterMiddleware)
));