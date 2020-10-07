import { RootState } from "../../store";
import { ActionTypes} from "../../actions";
import {SocketActionTypeKeys} from '../../actions'
import { Middleware } from "redux";

/** 
 * Normalizes coordinates so that tables top right corner is the origo
 */ 

export const normalizeVerbPositionMiddleware:  Middleware<{}, RootState> = store => 
    next => 
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB){
                if(action.verb !== null){
                    const {tablePosition} = store.getState();
                    const {positionX, positionY} = action.verb;

                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;
                }
            }
            return next(action);
        }
