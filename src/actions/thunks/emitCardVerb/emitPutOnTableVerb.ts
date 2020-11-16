import { ThunkResult } from "../..";
import { CardVerbTypes, IPutOnTable } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitPutOnTableVerb = (entityId: string, positionX: number, positionY: number, faceUp: boolean): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IPutOnTable = {
            entityId,
            positionX,
            positionY,
            faceUp,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.PUT_ON_TABLE
        }
        dispatch(socketEmitVerb(verb));
    }