import {MaybeNull} from './genericTypes'

export type CardEntity = {
    face: string,
    entityId: string,
    entityType: EntityTypes.CARD
    positionX: number,
    positionY: number,
    width: number,
    height: number
    scale: number
}

export type DeckEntity = {
    entityId: string,
    entityType: EntityTypes.DECK
    positionX: number,
    positionY: number,
    width: number,
    height: number
    scale: number,
    cards: CardEntity[]
}

export enum EntityTypes {
    CARD = 'CARD',
    DECK = 'DECK'
}

export type GrabbedEntity = MaybeNull<{
    entityId: string,
    entityType: EntityTypes
    grabbedAtX: number,
    grabbedAtY: number
}>

export type Client = {
    clientInfo: ClientInfo,
    grabbedEntitiy: GrabbedEntity
}

export type ClientInfo ={
    clientId: string,
    clientName?: string,
}

export interface GameState {
    cards: CardEntity[],
    decks: DeckEntity[],
    clients: Client[]
}