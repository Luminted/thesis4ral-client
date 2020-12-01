import { TThunkResult } from "..";
import { EDeckVerbTypes, IResetVerb } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitResetVerb = (entityId: string): TThunkResult => 
    dispatch => {
        const verb: IResetVerb = {
            entityId,
            type: EDeckVerbTypes.RESET
        }
        dispatch(socketEmitVerb(verb));
    }