import { ThunkResult } from "../..";
import { CardVerbTypes, IReorderHandVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitReorderHandVerb = (order: number[]): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IReorderHandVerb = {
            order,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.REORDER_HAND
        }
        dispatch(socketEmitVerb(verb));
    }