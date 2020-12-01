import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetTablePositionAction = {
    type: SetterActionTypeKeys.SET_TABLE_POSITION,
    positionX: number,
    positionY: number
}

export const setTablePosition = (positionX: number, positionY: number): SetTablePositionAction => {
    return {
        type: SetterActionTypeKeys.SET_TABLE_POSITION,
        positionX,
        positionY
    }
}