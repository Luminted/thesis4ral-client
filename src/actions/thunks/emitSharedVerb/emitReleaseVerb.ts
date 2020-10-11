import { ThunkResult } from "../..";
import { EntityTypes } from "../../../types/dataModelDefinitions";
import { IReleaseVerb, SharedVerbTypes } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

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