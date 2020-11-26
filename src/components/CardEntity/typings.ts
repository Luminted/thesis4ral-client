import { ICardEntityMetadata } from "../../types/dataModelDefinitions"

export interface IProps {
    entityId: string
    positionX: number
    positionY: number
    faceUp: boolean
    metadata: ICardEntityMetadata
    rotation: number
    zIndex: number
}