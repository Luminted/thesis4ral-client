import { ICardEntityMetadata, IEntityMetadata } from "../../types/dataModelDefinitions";

export const frenchCardConfig = {
    width: 560,
    height: 880
}

export {default as french52Sorted} from "./french52Sorted";

export const getDeckCardsMetadata = (cards: IEntityMetadata[], cardBack: string): ICardEntityMetadata[] => 
    cards.map(card => ({
        ...card,
        back: cardBack
    }))