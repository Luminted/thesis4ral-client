import { ThunkResult } from "../.."
import { IRotateVerb, SharedVerbTypes, EntityTypes } from "../../../typings"
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