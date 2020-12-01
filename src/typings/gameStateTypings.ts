import {MaybeNull} from './utilityTypings'

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
    metadata: ICardEntityMetadata
}

export interface IDeckEntity extends IEntity {
    metadata: IEntityMetadata
}

export interface IEntityMetadata {
    name: string
    type: string
}

export interface ICardEntityMetadata extends IEntityMetadata {
    back: string
}

export interface IHandCard extends Pick<ICardEntity, "entityId" | "metadata" | "ownerDeck" | "faceUp"> {}

export interface IDeckCard extends Pick<ICardEntity, "entityId" | "metadata"> {}

export interface IClientHand {
    clientId: string
    cards: IHandCard[]
    ordering: number[]
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
    grabbedEntity: GrabbedEntity
}

export type ClientInfo ={
    clientId: string,
    clientName?: string,
    seatId: string
}

export interface GameState {
    cards: ICardEntity[],
    decks: IDeckEntity[],
    clients: Client[],
    hands: IClientHand[],
    entityScale: number,
    topZIndex: number
}

export type SerializedGameState = {
    cards: ICardEntity[],
    decks: IDeckEntity[],
    clients: Client[],
    hands: IClientHand[],
    entityScale: number
}