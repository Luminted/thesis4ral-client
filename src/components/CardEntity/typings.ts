import { IEntityMetadata } from "../../types/dataModelDefinitions";

export interface Props {
    entityId: string
    positionX: number
    positionY: number
    faceUp: boolean
    context: ECardInteractionContext
    metadata: IEntityMetadata
    rotation?: number
    zIndex?: number
}
export enum ECardInteractionContext {
    TABLE = "TABLE",
    HAND = "HAND"
}
