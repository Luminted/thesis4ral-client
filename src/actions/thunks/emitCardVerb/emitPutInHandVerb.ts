import { ThunkResult } from "..";
import { CardVerbTypes, IPutInHandVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../";
import { SocketVerbAckFunction } from "../../socketEmitVerb";

export const emitPutInHandVerb = (entityId: string, faceUp: boolean, ackFunction?: SocketVerbAckFunction): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IPutInHandVerb = {
            entityId,
            faceUp,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.PUT_IN_HAND
        }
        dispatch(socketEmitVerb(verb, ackFunction));
    }