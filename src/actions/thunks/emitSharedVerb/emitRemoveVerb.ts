import { TThunkResult } from "..";
import { IRemoveVerb, ESharedVerbTypes, EEntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitRemoveVerb = (entityId: string, entityType: EEntityTypes): TThunkResult => 
    dispatch => {
        const verb: IRemoveVerb = {
            entityId,
            entityType,
            type: ESharedVerbTypes.REMOVE
        }
        dispatch(socketEmitVerb(verb));
    }