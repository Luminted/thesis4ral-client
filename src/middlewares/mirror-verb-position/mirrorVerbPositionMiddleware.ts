import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import {Middleware} from 'redux'
import { RootState } from "../../store";
import { mirrorOnTablePosition, isVerbTypeWithPosition } from "../../utils";
import { CardVerbTypes } from "../../types/verb";

export const mirrorVerbPositionMiddleware: Middleware<{}, RootState> = store => next => (action: ActionTypes) => {
    if(action.type === SocketActionTypeKeys.EMIT_VERB){

        if(isVerbTypeWithPosition(action.verb)){
            const {positionX, positionY} = action.verb;
            const {tablePixelDimensions} = store.getState();
            const transformedPosition = mirrorOnTablePosition(positionX, positionY, tablePixelDimensions!.width, tablePixelDimensions!.height)

            action.verb.positionX = transformedPosition[0];
            action.verb.positionY = transformedPosition[1];
            console.log('mirrored ', action.verb.positionX,
            action.verb.positionY);

            // GrabbedAt position needs to be mirrored too
            if(action.verb.type === CardVerbTypes.GRAB_FROM_HAND){
                const {grabbedAtX, grabbedAtY} = action.verb;
                const transformedGrabbedAtPosition = mirrorOnTablePosition(grabbedAtX, grabbedAtY, tablePixelDimensions!.width, tablePixelDimensions!.height)
                
                action.verb.grabbedAtX = transformedGrabbedAtPosition[0];
                action.verb.grabbedAtY = transformedGrabbedAtPosition[1];
            }
            
        }
    }
    return next(action);
}