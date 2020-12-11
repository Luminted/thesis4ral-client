import { TThunkResult } from "..";
import { EDeckVerbTypes, IDrawFaceDownVerb, TGameState, TMaybeNull } from "../../../typings";
import { socketEmitVerb } from "../../";

type TDrawFaceDownAckFunction = (error: TMaybeNull<string>, nextGameState: TGameState, drawnCardId: string) => void;

export const emitDrawFaceDownVerb = (entityId: string, ackFunction?: TDrawFaceDownAckFunction): TThunkResult => 
    dispatch => {
        const verb: IDrawFaceDownVerb = {
            entityId,
            type: EDeckVerbTypes.DRAW_FACE_DOWN
        }
        dispatch(socketEmitVerb(verb, ackFunction));
    }