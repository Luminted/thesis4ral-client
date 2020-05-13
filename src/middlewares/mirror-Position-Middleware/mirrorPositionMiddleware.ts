import { ActionTypes, SocketActionTypeKeys, SocketActionTypes } from "../../actions";
import {Middleware} from 'redux'
import { RootState } from "../../store";
import { mirrorOnTablePosition } from "../../utils";

export const mirrorPositionMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(action.type === SocketActionTypeKeys.EMIT_VERB){
        const {positionX, positionY} = action.verb;
        const {tablePosition} = store.getState();
        const transformedPosition = mirrorOnTablePosition(positionX, positionY, tablePosition.x, tablePosition.y)
        
        action.verb.positionX = transformedPosition[0];
        action.verb.positionY = transformedPosition[1];

        next(action)
    }
}