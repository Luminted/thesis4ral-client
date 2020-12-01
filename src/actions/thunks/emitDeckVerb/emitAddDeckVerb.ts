import { ThunkResult } from "..";
import { IEntityMetadata, ICardEntityMetadata, SerializedGameState } from "../../../types/dataModelDefinitions";
import { DeckVerbTypes, IAddDeckVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../";

export const emitAddDeckVerb = (containedCardsMetadata: ICardEntityMetadata[], metadata: IEntityMetadata, positionX: number, positionY: number, rotation: number, ackFunction?: (nextGameState: SerializedGameState) => void): ThunkResult => 
    dispatch => {
        const verb: IAddDeckVerb = {
            containedCardsMetadata,
            metadata,
            positionX,
            positionY,
            rotation,
            type: DeckVerbTypes.ADD_DECK
        }
        dispatch(socketEmitVerb(verb, ackFunction));
    }