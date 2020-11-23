import { frenchCardConfig } from "../entities";
import {ECardTypes} from "../types/entityTypings";

export const getCardDimensions = (type: string) => {
    switch(type){
        case ECardTypes.FRENCH:
            const {height, width} = frenchCardConfig;
            return {width, height};
        default:
            throw new Error("Type of card not found.");
    }
}