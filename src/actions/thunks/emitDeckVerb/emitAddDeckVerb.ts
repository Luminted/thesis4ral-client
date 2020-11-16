import { ThunkResult } from "../..";
import { IEntityMetadata, ICardEntityMetadata } from "../../../types/dataModelDefinitions";
import { DeckVerbTypes, IAddDeckVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitAddDeckVerb = (containedCardsMetadata: ICardEntityMetadata[], metadata: IEntityMetadata, positionX: number, positionY: number, rotation: number): ThunkResult => 
    dispatch => {
        const verb: IAddDeckVerb = {
            containedCardsMetadata,
            metadata,
            positionX,
            positionY,
            rotation,
            type: DeckVerbTypes.ADD_DECK
        }
        dispatch(socketEmitVerb(verb));
    }