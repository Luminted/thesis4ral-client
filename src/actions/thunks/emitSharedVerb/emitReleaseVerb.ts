import { ThunkResult } from "..";
import { IReleaseVerb, SharedVerbTypes, EntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitReleaseVerb = (entityId: string, entityType: EntityTypes): ThunkResult =>
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IReleaseVerb = {
            entityId,
            entityType,
            clientId: clientInfo!.clientId,
            type: SharedVerbTypes.RELEASE
        }
        dispatch(socketEmitVerb(verb));
    }