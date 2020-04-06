import { MouseInputTypes } from "./types";
import { MaybeNull } from "../common/genericTypes";
import { EntityTypes } from "../common/dataModelDefinitions";
import { cardInteractionMapping, deckInteractionMapping } from "./inputMappings";
import { Verb } from "../common/verbTypes";

export function verbFactory(mouseInputType: MouseInputTypes, entityType: MaybeNull<EntityTypes>, entityId: MaybeNull<string>, clientId: string, positionX: number, positionY: number): MaybeNull<Verb>{

    if(entityType === EntityTypes.CARD){
        const verbType = cardInteractionMapping[mouseInputType];
        if(verbType){
            return {
                type:verbType,
                clientId,
                positionX,
                positionY,
                entityId,
                entityType
            }
        }
    }
    else if(entityType === EntityTypes.DECK){
        const verbType = deckInteractionMapping[mouseInputType];
        if(verbType){
            return{
                type: verbType,
                clientId,
                positionX,
                positionY,
                entityId,
                entityType
            }
        }
    }

    return null;
}