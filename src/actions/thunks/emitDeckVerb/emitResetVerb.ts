import { ThunkResult } from "..";
import { DeckVerbTypes, IResetVerb } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitResetVerb = (entityId: string): ThunkResult => 
    dispatch => {
        const verb: IResetVerb = {
            entityId,
            type: DeckVerbTypes.RESET
        }
        dispatch(socketEmitVerb(verb));
    }