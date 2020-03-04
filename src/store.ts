import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import {gameState, socket, clientInfo} from './reducers';
import {ActionTypes, ActionTypeKeys} from './actions'
import {SocketEventTypes} from './common/socketEventTypes'

const rootReducer = combineReducers({
    gameState,
    socket,
    clientInfo
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, socketEmitterMiddleware)
));


function socketEmitterMiddleware (store) {
    return next => (action: ActionTypes) => {
        if(action.type.startsWith('emit/')){
            const state = store.getState();
            const socket = state.socket;
            if(socket !== null){
                switch(action.type){
                    case ActionTypeKeys.EMIT_MOUSE_INPUT:
                        socket.emit(SocketEventTypes.MOUSE_INPUT, action.input);
                        console.log(`socket event emitted: type=${SocketEventTypes.MOUSE_INPUT}, input=${action.input}, inputType=${action.input.type}`  );
                }
            }
        }
        next(action);
    }
}