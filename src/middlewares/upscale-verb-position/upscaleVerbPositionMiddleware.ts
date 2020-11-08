import { Middleware } from "redux";
import { RootState } from "../../store";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { isVerbTypeWithPosition, upscale } from "../../utils";
import {tableVirtualHeight, tableVirtualWidth} from "../../config";
import { Ratio } from "../../types/additionalTypes";
import { CardVerbTypes, DeckVerbTypes } from "../../types/verb";

export const upscaleVerbPositionMiddleware: Middleware<{}, RootState> = store => 
    next =>
        (action: ActionTypes) => {
            
            if(action.type === SocketActionTypeKeys.EMIT_VERB) {

                // abort transformation for certain verbs
                if(action.verb.type === DeckVerbTypes.ADD_DECK){
                    return next(action);
                }

                // these verbs have position fileds
                // only way to force TS to narrow types os to check one by one
                if(isVerbTypeWithPosition(action.verb)){
                        const {positionX, positionY} = action.verb;
                        const {tablePixelDimensions} = store.getState();
                        const horizontalScalingRatio: Ratio = {
                            // TODO: handle null better
                            numerator: tablePixelDimensions!.width,
                            divisor: tableVirtualWidth
                        }
                        const verticalScalingRatio: Ratio = {
                            numerator: tablePixelDimensions!.height,
                            divisor: tableVirtualHeight
                        }


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