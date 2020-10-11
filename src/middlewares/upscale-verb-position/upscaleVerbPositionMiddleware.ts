import { Middleware } from "redux";
import { RootState } from "../../store";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { upscale } from "../../utils";
import { CardVerbTypes, DeckVerbTypes, SharedVerbTypes } from "../../types/verb";

export const upscaleVerbPositionMiddleware: Middleware<{}, RootState> = store => 
    next =>
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB) {

                // these verbs have position fileds
                // only way to force TS to narrow types os to check one by one
                if(action.verb.type === SharedVerbTypes.MOVE || 
                    action.verb.type === SharedVerbTypes.GRAB ||
                    action.verb.type === SharedVerbTypes.MOVE_TO ||
                    action.verb.type === CardVerbTypes.ADD_CARD ||
                    action.verb.type === CardVerbTypes.GRAB_FROM_HAND ||
                    action.verb.type === CardVerbTypes.PUT_ON_TABLE ||
                    action.verb.type === DeckVerbTypes.ADD_DECK
                    ){
                        const {positionX, positionY} = action.verb;
                        const {verticalScalingRatio, horizontalScalingRatio} = store.getState();
                        action.verb.positionX = upscale(horizontalScalingRatio, positionX);
                        action.verb.positionY = upscale(verticalScalingRatio, positionY);
                        // console.log('upscaling', positionX, positionY, action.verb.positionX, action.verb.positionY)
                    }
            }
            next(action);
        }