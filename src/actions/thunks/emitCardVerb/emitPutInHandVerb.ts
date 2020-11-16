import { ThunkResult } from "../..";
import { CardVerbTypes, IPutInHandVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitPutInHandVerb = (entityId: string, revealed: boolean, faceUp: boolean): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IPutInHandVerb = {
            entityId,
            revealed,
            faceUp,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.PUT_IN_HAND
        }
        dispatch(socketEmitVerb(verb));
    }