import { ThunkMiddleware } from "redux-thunk";
import { RootState } from "./store";
import { ActionTypes, ActionTypeKeys } from "./actions";
import { SocketEventTypes } from "./common/socketEventTypes";

export const socketEmitterMiddleware: ThunkMiddleware<RootState, ActionTypes, undefined> = (store) => {
    return next => (action: ActionTypes) => {
        if(action.type.startsWith('emit/')){
            const state = store.getState();
            const socket = state.socket;
            if(socket !== null){
                //TODO: Don't send undefined verb
                if(action.type === ActionTypeKeys.EMIT_VERB){
                    if(action.verb !== null){
                        socket.emit(SocketEventTypes.VERB, action.verb);
                        console.log(`socket event emitted: type=${SocketEventTypes.VERB}, verb type=${action.verb?.type}`  );
                    }else{
                        console.log('Verb to be emitted is NULL. Aborting emit.')
                    }
                }
            }
        }
        next(action);
    }
}

export const normalizeEmittedPositionToTable: ThunkMiddleware<RootState, ActionTypes, undefined> = (store) => {
    return next => (action: ActionTypes) => {
        if(action.type.startsWith('emit/')) {
            if(action.type === ActionTypeKeys.EMIT_VERB){
                if(action.verb !== null){
                    const {tablePosition} = store.getState();
                    const {positionX, positionY} = action.verb;
                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;
                }
            }

        }
        next(action);
    }
}