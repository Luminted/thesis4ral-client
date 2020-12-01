import { TThunkResult } from "../../"
import { ECardVerbTypes, IFlipVerb } from "../../../typings"
import { socketEmitVerb } from "../../"

export const emitFlipVerb = (entityId: string): TThunkResult => 
    dispatch => {
        const verb: IFlipVerb = {
            entityId,
            type: ECardVerbTypes.FLIP
        }
        dispatch(socketEmitVerb(verb));
    }