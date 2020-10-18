import { ReactNode } from "react";
import { EntityTypes } from "../../types/dataModelDefinitions";

export interface IProps {
    entityId: string
    entityType: EntityTypes
    positionX: number
    positionY: number
    rotation: number
    rotationStep: number
    clickPassThrough: boolean
    graphicalContent: ReactNode
    zIndex?: number
    menuContent?: ReactNode
    eventHandlers?: {[key in string]: Function}
}