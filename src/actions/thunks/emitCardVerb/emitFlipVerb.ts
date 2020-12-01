import { ThunkResult } from "../../"
import { CardVerbTypes, IFlipVerb } from "../../../types/verb"
import { socketEmitVerb } from "../../"

export const emitFlipVerb = (entityId: string): ThunkResult => 
    dispatch => {
        const verb: IFlipVerb = {
            entityId,
            type: CardVerbTypes.FLIP
        }
        dispatch(socketEmitVerb(verb));
    }