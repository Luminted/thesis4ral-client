import { TThunkResult } from "../.."
import { IMoveVerb, ESharedVerbTypes } from "../../../typings"
import { socketEmitVerb } from "../../"

export const emitMoveVerb = (positionX: number, positionY: number):TThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IMoveVerb = {
            positionX,
            positionY,
            clientId: clientInfo!.clientId,
            type: ESharedVerbTypes.MOVE
        }
        dispatch(socketEmitVerb(verb));
    }
