import { IEntityMetadata } from "../../types/dataModelDefinitions";

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    rotation: number
    inHandOf: string
    isRevealed: boolean
    isMirrored: boolean
    metadata: IEntityMetadata
}