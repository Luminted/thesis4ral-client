import { ThunkResult } from "..";
import { DeckVerbTypes, IShuffleVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../";

export const emitShuffleVerb = (entityId: string): ThunkResult =>
    dispatch => {
        const verb: IShuffleVerb = {
            entityId,
            type: DeckVerbTypes.SHUFFLE
        }
        dispatch(socketEmitVerb(verb));
    }