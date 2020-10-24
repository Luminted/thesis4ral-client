import { Middleware } from "redux";
import { CardVerbTypes, DeckVerbTypes } from "../../types/verb"
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

                // abort transformation for certain types
                if(action.verb.type === DeckVerbTypes.ADD_DECK){
                    return next(action);
                }
                
                if(isVerbTypeWithPosition(action.verb)){
                    const {positionX, positionY} = action.verb;
                    const {tablePosition} = store.getState();

                    action.verb.positionX = positionX - tablePosition.x;
                    action.verb.positionY = positionY - tablePosition.y;

                    // GRAB_FROM_HAND has another set of position that needs to be normalized 
                    if(action.verb.type === CardVerbTypes.GRAB_FROM_HAND){
                        const {grabbedAtX, grabbedAtY} = action.verb;
                        action.verb.grabbedAtX = grabbedAtX - tablePosition.x;
                        action.verb.grabbedAtY = grabbedAtY - tablePosition.y;
                    }

                }
            }
            return next(action);
        }
