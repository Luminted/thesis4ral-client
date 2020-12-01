import { ThunkResult } from "..";
import { IRemoveVerb, SharedVerbTypes, EntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitRemoveVerb = (entityId: string, entityType: EntityTypes): ThunkResult => 
    dispatch => {
        const verb: IRemoveVerb = {
            entityId,
            entityType,
            type: SharedVerbTypes.REMOVE
        }
        dispatch(socketEmitVerb(verb));
    }