import { SocketActionTypeKeys } from "../../actions";
import {Middleware} from 'redux'
import { RootState } from "../../store";
import { inverseMirrorOnTablePosition } from "../../utils";

export const mirrorVerbPositionMiddleware: Middleware<{}, RootState> = store => next => (action) => {
    if(action.type === SocketActionTypeKeys.EMIT_VERB){
        const {positionX, positionY} = action.verb;
        const {tablePixelDimensions} = store.getState();
        const transformedPosition = inverseMirrorOnTablePosition(positionX, positionY, tablePixelDimensions!.width, tablePixelDimensions!.height)
        
        action.verb.positionX = transformedPosition[0];
        action.verb.positionY = transformedPosition[1];
        console.log('mirrored ', action.verb.positionX,
        action.verb.positionY)
    }
    return next(action);
}