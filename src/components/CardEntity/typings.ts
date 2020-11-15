import { IEntityMetadata } from "../../types/dataModelDefinitions"

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    faceUp: boolean
    metadata: IEntityMetadata
    isMirrored: boolean
    rotation: number
    zIndex: number
}