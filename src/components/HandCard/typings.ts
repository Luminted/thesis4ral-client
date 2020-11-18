import { ICardEntityMetadata } from "../../types/dataModelDefinitions";

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    zIndex: number
    rotation: number
    faceUp: boolean
    inHandOf: string
    metadata: ICardEntityMetadata
    isRevealed: boolean
    isMirrored: boolean
    hoverFeedback: boolean

    onMouseEnter: () => void
    onMouseLeave: () => void
}