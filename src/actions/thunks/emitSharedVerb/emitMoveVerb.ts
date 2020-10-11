import { ThunkResult } from "../.."
import { IMoveVerb, SharedVerbTypes } from "../../../types/verb"
import { socketEmitVerb } from "../../socketActions"

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
