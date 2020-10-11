import { Middleware } from "redux";
import { CardVerbTypes, DeckVerbTypes, SharedVerbTypes } from "../../types/verb"
import { RootState } from "../../store";
import { ActionTypes} from "../../actions";
import {SocketActionTypeKeys} from '../../actions'

/** 
 * Normalizes coordinates so that tables top right corner is the origo
 */ 
export const normalizeVerbPositionMiddleware:  Middleware<{}, RootState> = store => 
    next => 
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB){
                if(action.verb !== null){

                    // these verbs have position fileds
                    // only way to make TS narrow down types is to compare one by one
                    if(action.verb.type === SharedVerbTypes.MOVE || 
                        action.verb.type === SharedVerbTypes.GRAB ||
                        action.verb.type === SharedVerbTypes.MOVE_TO ||
                        action.verb.type === CardVerbTypes.ADD_CARD ||
                        action.verb.type === CardVerbTypes.GRAB_FROM_HAND ||
                        action.verb.type === CardVerbTypes.PUT_ON_TABLE ||
                        action.verb.type === DeckVerbTypes.ADD_DECK
                        ){
                        const {tablePosition} = store.getState();
                        const {positionX, positionY} = action.verb;
    
                        action.verb.positionX = positionX - tablePosition.x;
                        action.verb.positionY = positionY - tablePosition.y;
                    }
                }
            }
            return next(action);
        }
