import {MaybeNull} from './genericTypes'

export interface IEntity {
    entityType: EntityTypes,
    entityId: string,
    positionX: number,
    positionY: number,
    grabbedBy: MaybeNull<string>
    zIndex: number,
    rotation: number,
    metadata?: IEntityMetadata
}

export interface ICardEntity extends IEntity {
    faceUp: boolean,
    ownerDeck: MaybeNull<string>
    metadata: IEntityMetadata
}

export interface IDeckEntity extends IEntity {
    metadata: IEntityMetadata
}

export interface IEntityMetadata {
    entityId: string
    configId: string
}

export interface IDeckCard extends Pick<ICardEntity, "entityId" | "faceUp" | "metadata"> {}

export interface IHandCard extends Pick<ICardEntity, "entityId" | "faceUp" | "metadata"> {
    ownerDeck: string,
}

export interface IClientHand {
    clientId: string
    cards: IHandCard[]
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
    seatedAt: ESeatOrientation
}

export enum ESeatOrientation {
    SOUTH = 'SOUTH',
    NORTH = 'NORTH',
    SOUTH_WEST = 'SOUTH_WEST',
    SOUTH_EAST = 'SOUTH_EAST',
    NORTH_WEST = 'NORTH_WEST',
    NORTH_EAST = 'NORTH_EAST'
} 

export interface GameState {
    cards: ICardEntity[],
    decks: IDeckEntity[],
    clients: Client[],
    hands: IClientHand[],
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
    decks: IDeckEntity[],
    clients: Client[],
    hands: IClientHand[],
    entityScale: number
}