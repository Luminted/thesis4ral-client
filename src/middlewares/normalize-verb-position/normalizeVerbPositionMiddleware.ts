import { RootState } from "../../store";
import { ActionTypes} from "../../actions";
import {SocketActionTypeKeys} from '../../actions'
import { Middleware } from "redux";

export const normalizeVerbPositionMiddleware:  Middleware<{}, RootState> = (store) => {
    return next => (action: ActionTypes) => {
        if(action.type.startsWith('socket/')) {
            if(action.type === SocketActionTypeKeys.EMIT_VERB){
                if(action.verb !== null){
                    const {tablePosition} = store.getState();
                    const {positionX, positionY} = action.verb;
                    console.log('normalizing position ', positionX, positionY)
                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;
                    console.log(action.verb.positionX, action.verb.positionY)
                }
            }
        }
        return next(action);
    }
}