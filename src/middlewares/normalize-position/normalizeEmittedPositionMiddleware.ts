import { ThunkMiddleware } from "redux-thunk";
import { RootState } from "../../store";
import { ActionTypes} from "../../actions";
import {SocketActionTypeKeys} from '../../actions'
import { Middleware } from "redux";

export const normalizeEmittedPositionMiddleware:  Middleware<{}, RootState> = (store) => {
    return next => (action: ActionTypes) => {
        if(action.type.startsWith('socket/')) {
            if(action.type === SocketActionTypeKeys.EMIT_VERB){
                if(action.verb !== null){
                    const {tablePosition} = store.getState();
                    const {positionX, positionY} = action.verb;
                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;
                }
            }
        }
        return next(action);
    }
}