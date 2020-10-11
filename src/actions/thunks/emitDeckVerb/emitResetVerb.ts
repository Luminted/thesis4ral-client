import { ThunkResult } from "../..";
import { DeckVerbTypes, IResetVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitResetVerb = (entityId: string): ThunkResult => 
    dispatch => {
        const verb: IResetVerb = {
            entityId,
            type: DeckVerbTypes.RESET
        }
        dispatch(socketEmitVerb(verb));
    }