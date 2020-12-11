import { TThunkResult } from "..";
import { IMoveToVerb, ESharedVerbTypes, EEntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitMoveToVerb = (entityId: string, entityType: EEntityTypes, positionX: number, positionY: number): TThunkResult => 
    dispatch => {
        const verb: IMoveToVerb = {
            entityId,
            entityType,
            positionX,
            positionY,
            type: ESharedVerbTypes.MOVE_TO
        }
        dispatch(socketEmitVerb(verb));
    }