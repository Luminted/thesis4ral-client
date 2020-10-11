import { ThunkResult } from "../..";
import { IEntityMetadata } from "../../../types/dataModelDefinitions";
import { CardVerbTypes, IAddCardVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitAddCardVerb = (faceUp: boolean, metadata: IEntityMetadata, positionX: number, positionY: number, rotation: number): ThunkResult =>
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