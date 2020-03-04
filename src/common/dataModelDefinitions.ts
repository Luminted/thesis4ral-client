import {MaybeNull} from './genericTypes'

export interface CardDataModel {
    entityId: string,
    entityType: EntityTypes.CARD
    positionX: number,
    positionY: number,
    width: number,
    height: number
}

export enum EntityTypes {
    CARD = 'CARD'
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
    cards: CardDataModel[],
    clients: Client[]
}