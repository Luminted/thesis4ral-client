import { ThunkResult } from "..";
import { EntityTypes } from "../../../types/dataModelDefinitions";
import { IGrabVerb, SharedVerbTypes } from "../../../types/verb";
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