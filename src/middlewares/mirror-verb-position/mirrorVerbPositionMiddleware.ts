import { ActionTypes, SocketActionTypeKeys, SocketActionTypes } from "../../actions";
import {Middleware} from 'redux'
import { RootState } from "../../store";
import { inverseMirrorOnTablePosition } from "../../utils";
import {tableDimensions} from '../../config/visuals'

export const mirrorVerbPositionMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(action.type === SocketActionTypeKeys.EMIT_VERB){
        const {positionX, positionY} = action.verb;
        const transformedPosition = inverseMirrorOnTablePosition(positionX, positionY, tableDimensions.width, tableDimensions.height)
        console.log('mirroring', positionX, positionY, transformedPosition)
        
        action.verb.positionX = transformedPosition[0];
        action.verb.positionY = transformedPosition[1];
    }
    return next(action);
}