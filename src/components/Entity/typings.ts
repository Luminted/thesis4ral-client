import { ReactNode } from "react";
import { IEntity } from "../../types/dataModelDefinitions";

export interface IProps extends IEntity {
    width: number
    height: number
    rotationStep: number
    clickPassThrough: boolean
    svgEndpoint: string
    boundToTable: boolean
    menuContent?: ReactNode
    eventHandlers?: {[key in string]: Function}
}