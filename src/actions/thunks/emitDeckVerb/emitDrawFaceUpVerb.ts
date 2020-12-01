import { ThunkResult } from "..";
import { DeckVerbTypes, IDrawFaceUpVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../";

export const emitDrawFaceUpVerb = (entityId: string): ThunkResult => 
    dispatch => {
        const verb: IDrawFaceUpVerb = {
            entityId,
            type: DeckVerbTypes.DRAW_FACE_UP
        }
        dispatch(socketEmitVerb(verb));
    }