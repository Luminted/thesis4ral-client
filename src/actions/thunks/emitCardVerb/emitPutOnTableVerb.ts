import { TThunkResult } from "..";
import { ECardVerbTypes, IPutOnTable } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitPutOnTableVerb = (entityId: string, positionX: number, positionY: number, faceUp: boolean): TThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IPutOnTable = {
            entityId,
            positionX,
            positionY,
            faceUp,
            clientId: clientInfo!.clientId,
            type: ECardVerbTypes.PUT_ON_TABLE
        }
        dispatch(socketEmitVerb(verb));
    }