import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetTablePixelDimensionsAction = {
    type: SetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
    dimensions: {
        width: number,
        height: number
    }
}

export const setTablePixelDimensions = (width: number, height: number): SetTablePixelDimensionsAction => {
    return {
        type: SetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
        dimensions: {
            width,
            height
        }
    }
}