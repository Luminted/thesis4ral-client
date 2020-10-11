import { ThunkResult } from "../..";
import { CardVerbTypes, IPutInHandVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitPutInHandVerb = (entityId: string): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IPutInHandVerb = {
            entityId,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.PUT_IN_HAND
        }
        dispatch(socketEmitVerb(verb));
    }