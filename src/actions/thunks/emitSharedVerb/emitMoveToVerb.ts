import { ThunkResult } from "../..";
import { EntityTypes } from "../../../types/dataModelDefinitions";
import { IMoveToVerb, SharedVerbTypes } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

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