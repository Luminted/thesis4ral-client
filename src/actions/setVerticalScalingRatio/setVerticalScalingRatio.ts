import { TRatio } from "../../typings"
import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetVerticalScalingRationAction = {
    type: ESetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
    ratio: TRatio
}

export const setVerticalScalingRatio = (ratio: TRatio): TSetVerticalScalingRationAction => {
    return {
        type: ESetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
        ratio
    }
}