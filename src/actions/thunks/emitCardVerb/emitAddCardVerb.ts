import { ThunkResult } from "..";
import { CardVerbTypes, IAddCardVerb, ICardEntityMetadata } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitAddCardVerb = (faceUp: boolean, metadata: ICardEntityMetadata, positionX: number, positionY: number, rotation: number): ThunkResult =>
    dispatch => {
        const verb: IAddCardVerb = {
            faceUp,
            metadata,
            positionX,
            positionY,
            rotation,
            type: CardVerbTypes.ADD_CARD
        }
        dispatch(socketEmitVerb(verb));
    }