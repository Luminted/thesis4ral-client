import { IEntityMetadata } from "../../types/dataModelDefinitions"

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    faceUp: boolean
    context: ECardInteractionContext
    metadata: IEntityMetadata
    isMirrored: boolean
    rotation?: number
    zIndex?: number
    inHandOf?: string
}
export enum ECardInteractionContext {
    TABLE = "TABLE",
    HAND = "HAND"
}
