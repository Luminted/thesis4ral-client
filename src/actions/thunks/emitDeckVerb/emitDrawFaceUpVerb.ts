import { TThunkResult } from "..";
import { EDeckVerbTypes, IDrawFaceUpVerb } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitDrawFaceUpVerb = (entityId: string): TThunkResult => 
    dispatch => {
        const verb: IDrawFaceUpVerb = {
            entityId,
            type: EDeckVerbTypes.DRAW_FACE_UP
        }
        dispatch(socketEmitVerb(verb));
    }