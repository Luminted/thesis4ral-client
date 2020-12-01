import { ThunkResult } from "..";
import { IMoveToVerb, SharedVerbTypes, EntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitMoveToVerb = (entityId: string, entityType: EntityTypes, positionX, positionY): ThunkResult => 
    dispatch => {
        const verb: IMoveToVerb = {
            entityId,
            entityType,
            positionX,
            positionY,
            type: SharedVerbTypes.MOVE_TO
        }
        dispatch(socketEmitVerb(verb));
    }