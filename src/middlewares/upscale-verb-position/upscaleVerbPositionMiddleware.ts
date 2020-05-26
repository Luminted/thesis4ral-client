import { Middleware } from "redux";
import { RootState } from "../../store";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { upscale } from "../../utils";

export const upscaleVerbPositionMiddleware: Middleware<{}, RootState> = store => 
    next =>
        (action: ActionTypes) => {
            if(action.type === SocketActionTypeKeys.EMIT_VERB) {
                const {positionX, positionY} = action.verb;
                const {verticalScalingRatio, horizontalScalingRatio} = store.getState();
                action.verb.positionX = upscale(horizontalScalingRatio, positionX);
                action.verb.positionY = upscale(verticalScalingRatio, positionY);
                // console.log('upscaling', positionX, positionY, action.verb.positionX, action.verb.positionY)
            }
            next(action);
        }