import { TThunkResult } from "../.."
import { IRotateVerb, ESharedVerbTypes, EEntityTypes } from "../../../typings"
import { socketEmitVerb } from "../../";

export const emitRotateVerb = (entityId: string, entityType: EEntityTypes, angle: number): TThunkResult => 
    dispatch => {
        const verb: IRotateVerb = {
            entityId,
            entityType,
            angle,
            type: ESharedVerbTypes.ROTATE
        }
        dispatch(socketEmitVerb(verb));
    }