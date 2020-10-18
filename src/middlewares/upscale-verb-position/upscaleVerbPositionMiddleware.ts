import { Middleware } from "redux";
import { RootState } from "../../store";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { isVerbTypeWithPosition, upscale } from "../../utils";
import {tableVirtualHeight, tableVirtualWidth} from "../../config";
import { Ratio } from "../../types/additionalTypes";

export const upscaleVerbPositionMiddleware: Middleware<{}, RootState> = store => 
    next =>
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB) {

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
                        // console.log('upscaling', positionX, positionY, action.verb.positionX, action.verb.positionY)
                    }
            }
            next(action);
        }