import { EntityTypes } from "./dataModelDefinitions";
import { MaybeNull } from "./genericTypes";

export enum SharedVerbTypes {
    GRAB,
    MOVE,
    RELEASE,
    REMOVE,
    ADD,
}

export enum CardVerbTypes {
    FLIP,
    PUT_IN_HAND,
}

export enum DeckVerbTypes {
    DRAW_FACE_UP,
    DRAW_FACE_DOWN,
}

export type VerbTypes = SharedVerbTypes | CardVerbTypes | DeckVerbTypes;

interface VerbCommonalities {
    type: VerbTypes 
    entityId:MaybeNull<string>,
    entityType: MaybeNull<EntityTypes>,
    clientId: string,
    cursorX: number,
    cursorY: number 
}

export interface CardVerb extends VerbCommonalities {
    type: CardVerbTypes,
    entityType: MaybeNull<EntityTypes.CARD>
}

export interface DeckVerb extends VerbCommonalities{
    type: DeckVerbTypes,
    entityType: MaybeNull<EntityTypes.DECK>,
}

export interface SharedVerb extends VerbCommonalities {
    type: SharedVerbTypes
}

export type Verb = CardVerb | DeckVerb | SharedVerb;