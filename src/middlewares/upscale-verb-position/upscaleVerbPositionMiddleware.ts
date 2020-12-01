import { Middleware } from "redux";
import { RootState } from "../../store";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { isVerbTypeWithPosition, upscale } from "../../utils";
import { CardVerbTypes, DeckVerbTypes, Ratio } from "../../typings";

export const upscaleVerbPositionMiddleware: Middleware<{}, RootState> = store => 
    next =>
        (action: ActionTypes) => {
            
            if(action.type === SocketActionTypeKeys.EMIT_VERB) {
                // these verbs have position fileds
                console.log(action.verb)
                if(isVerbTypeWithPosition(action.verb)){
                        const {positionX, positionY} = action.verb;
                        const {horizontalScalingRatio, verticalScalingRatio} = store.getState();


                        action.verb.positionX = upscale(horizontalScalingRatio, positionX);
                        action.verb.positionY = upscale(verticalScalingRatio, positionY);

                        // GRAB_FROM_HAND has a set of extra positions to be upscaled
                        if(action.verb.type === CardVerbTypes.GRAB_FROM_HAND){
                            const {grabbedAtX, grabbedAtY} = action.verb
                            action.verb.grabbedAtX = upscale(horizontalScalingRatio, grabbedAtX);
                            action.verb.grabbedAtY = upscale(verticalScalingRatio, grabbedAtY);
                        }
                        // console.log('upscaling', positionX, positionY, action.verb.positionX, action.verb.positionY)
                    }
            }
            next(action);
        }