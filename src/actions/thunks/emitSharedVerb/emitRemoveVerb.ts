import { ThunkResult } from "../..";
import { EntityTypes } from "../../../types/dataModelDefinitions";
import { IRemoveVerb, SharedVerbTypes } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitRemoveVerb = (entityId: string, entityType: EntityTypes): ThunkResult => 
    dispatch => {
        const verb: IRemoveVerb = {
            entityId,
            entityType,
            type: SharedVerbTypes.REMOVE
        }
        dispatch(socketEmitVerb(verb));
    }