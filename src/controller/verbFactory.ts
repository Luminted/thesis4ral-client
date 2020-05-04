import { MouseInputTypes } from "./types";
import { MaybeNull, MaybeUndefined } from "../types/genericTypes";
import { EntityTypes } from "../types/dataModelDefinitions";
import { handCardInteractionMapping, tableCardInteractionMapping, deckInteractionMapping } from "./inputMappings";
import { Verb, CardVerbTypes, SharedVerbTypes } from "../types/verbTypes";
import { VerbContextTypes } from "../types/additionalTypes";

export function verbFactory(mouseInputType: MouseInputTypes, entityType: MaybeNull<EntityTypes>, entityId: MaybeNull<string>, clientId: string, positionX: number, positionY: number, verbContext: MaybeNull<VerbContextTypes> = null): MaybeNull<Verb>{

    if(entityType === EntityTypes.CARD){
        let verbType: MaybeUndefined<CardVerbTypes | SharedVerbTypes>;
        if(verbContext === VerbContextTypes.HAND){
            verbType = handCardInteractionMapping[mouseInputType];
        }
        else if(verbContext === VerbContextTypes.TABLE){
            verbType = tableCardInteractionMapping[mouseInputType];
        }
        if(verbType){
            return {
                type:verbType,
                clientId,
                positionX,
                positionY,
                entityId,
                entityType,
                
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