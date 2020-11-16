import { ICardEntityMetadata } from "../../types/dataModelDefinitions";

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    rotation: number
    faceUp: boolean
    inHandOf: string
    isRevealed: boolean
    isMirrored: boolean
    metadata: ICardEntityMetadata
}