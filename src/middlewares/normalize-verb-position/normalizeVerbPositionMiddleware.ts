import { Middleware } from "redux";
import { CardVerbTypes } from "../../types/verb"
import { RootState } from "../../store";
import { ActionTypes} from "../../actions";
import {SocketActionTypeKeys} from '../../actions'
import { isVerbTypeWithPosition } from "../../utils";

/** 
 * Normalizes coordinates so that tables top right corner is the origo
 */ 
export const normalizeVerbPositionMiddleware:  Middleware<{}, RootState> = store => 
    next => 
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB){
                // GRAB_FROM_HAND has another set of position that needs to be normalized 
                const {tablePosition} = store.getState();
                if(action.verb.type === CardVerbTypes.GRAB_FROM_HAND){
                    const {grabbedAtX, grabbedAtY} = action.verb;
                    action.verb.grabbedAtX = grabbedAtX - tablePosition.x;
                    action.verb.grabbedAtY = grabbedAtY - tablePosition.y;
                }
                if(isVerbTypeWithPosition(action.verb)){
                    const {positionX, positionY} = action.verb;

                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;

                }
            }
            return next(action);
        }
