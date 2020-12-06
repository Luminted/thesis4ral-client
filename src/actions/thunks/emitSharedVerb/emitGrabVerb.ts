import { TThunkResult } from "..";
import { IGrabVerb, ESharedVerbTypes, EEntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitGrabVerb = (entityId: string, entityType: EEntityTypes, positionX: number, positionY: number): TThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IGrabVerb = {
            entityId,
            entityType,
            positionX,
            positionY,
            clientId: clientInfo?.clientId || "",
            type: ESharedVerbTypes.GRAB
        }
        dispatch(socketEmitVerb(verb));
    }