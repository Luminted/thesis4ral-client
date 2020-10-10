import {MaybeNull} from './genericTypes'

export interface Entity {
    entityType: EntityTypes,
    entityId: string,
    positionX: number,
    positionY: number,
    grabbedBy: MaybeNull<string>
    zIndex: number
}

export interface ICardEntity extends Entity {
    entityId: string,
    entityType: EntityTypes.CARD,
    faceUp: boolean,
    ownerDeck: MaybeNull<string>
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
    //TODO: flatten this out
    clientInfo: ClientInfo,
    grabbedEntitiy: GrabbedEntity
}

export type ClientInfo ={
    clientId: string,
    clientName?: string,
    seatedAt: Seats
}

export enum Seats {
    SOUTH = 'SOUTH',
    NORTH = 'NORTH',
    SOUTH_WEST = 'SOUTH_WEST',
    SOUTH_EAST = 'SOUTH_EAST',
    NORTH_WEST = 'NORTH_WEST',
    NORTH_EAST = 'NORTH_EAST'
} 

export interface GameState {
    cards: ICardEntity[],
    decks: [],
    clients: Client[],
    hands: [],
    entityScale: number,
    topZIndex: number
}

export type PlayTable = {
    tableId: string,
    clientLimit: number
    gameState: GameState,
}

export type SerializedGameState = {
    cards: ICardEntity[],
    decks: [],
    clients: Client[],
    hands: [],
    entityScale: number
}