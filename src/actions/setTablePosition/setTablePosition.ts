import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetTablePositionAction = {
    type: ESetterActionTypeKeys.SET_TABLE_POSITION,
    positionX: number,
    positionY: number
}

export const setTablePosition = (positionX: number, positionY: number): TSetTablePositionAction => {
    return {
        type: ESetterActionTypeKeys.SET_TABLE_POSITION,
        positionX,
        positionY
    }
}