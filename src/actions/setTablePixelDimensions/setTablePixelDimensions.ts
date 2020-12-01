import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetTablePixelDimensionsAction = {
    type: ESetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
    dimensions: {
        width: number,
        height: number
    }
}

export const setTablePixelDimensions = (width: number, height: number): TSetTablePixelDimensionsAction => {
    return {
        type: ESetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
        dimensions: {
            width,
            height
        }
    }
}