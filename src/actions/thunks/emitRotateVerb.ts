import { ThunkResult } from ".."
import { EntityTypes } from "../../types/dataModelDefinitions"
import { RotateVerb, SharedVerbTypes } from "../../types/verbTypes"
import { socketEmitVerb } from "../socketActions";

export const emitRotateVerb = (positionX: number, positionY: number, entityId: string, entityType: EntityTypes, angle: number): ThunkResult<void> => 
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: RotateVerb = {
            positionX,
            positionY,
            entityId,
            entityType,
            angle,
            clientId: clientInfo!.clientId,
            type: SharedVerbTypes.ROTATE
        }
        dispatch(socketEmitVerb(verb));
    }