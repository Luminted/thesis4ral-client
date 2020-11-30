import { ICardEntityMetadata, IEntityMetadata } from "../../types/dataModelDefinitions";
import { ICardConfig } from "../../types/entityTypings";
export const frenchCardConfig: ICardConfig = {
    width: 560,
    height: 880
}



export const getDeckCardsMetadata = (cards: IEntityMetadata[], cardBack: string): ICardEntityMetadata[] => 
cards.map(card => ({
    ...card,
    back: cardBack
}))

export {default as french52SortedBlue} from "./french52SortedBlue";
export {default as french52SortedRed} from "./french52SortedRed";