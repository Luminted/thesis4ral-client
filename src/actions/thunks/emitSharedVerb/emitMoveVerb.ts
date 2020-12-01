import { ThunkResult } from "../.."
import { IMoveVerb, SharedVerbTypes } from "../../../typings"
import { socketEmitVerb } from "../../"

export const emitMoveVerb = (positionX: number, positionY: number):ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IMoveVerb = {
            positionX,
            positionY,
            clientId: clientInfo!.clientId,
            type: SharedVerbTypes.MOVE
        }
        dispatch(socketEmitVerb(verb));
    }
