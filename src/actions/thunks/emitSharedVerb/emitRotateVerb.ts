import { ThunkResult } from "../.."
import { EntityTypes } from "../../../types/dataModelDefinitions"
import { IRotateVerb, SharedVerbTypes } from "../../../types/verb"
import { socketEmitVerb } from "../../";

export const emitRotateVerb = (entityId: string, entityType: EntityTypes, angle: number): ThunkResult => 
    dispatch => {
        const verb: IRotateVerb = {
            entityId,
            entityType,
            angle,
            type: SharedVerbTypes.ROTATE
        }
        dispatch(socketEmitVerb(verb));
    }