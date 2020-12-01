import { TThunkResult } from "..";
import { ECardVerbTypes, IReorderHandVerb } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitReorderHandVerb = (order: number[]): TThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IReorderHandVerb = {
            order,
            clientId: clientInfo!.clientId,
            type: ECardVerbTypes.REORDER_HAND
        }
        dispatch(socketEmitVerb(verb));
    }