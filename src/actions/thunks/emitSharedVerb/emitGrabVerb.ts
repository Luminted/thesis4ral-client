import { ThunkResult } from "..";
import { IGrabVerb, SharedVerbTypes, EntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitGrabVerb = (entityId: string, entityType: EntityTypes, positionX: number, positionY: number): ThunkResult => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IGrabVerb = {
            entityId,
            entityType,
            positionX,
            positionY,
            clientId: clientInfo!.clientId,
            type: SharedVerbTypes.GRAB
        }
        dispatch(socketEmitVerb(verb));
    }