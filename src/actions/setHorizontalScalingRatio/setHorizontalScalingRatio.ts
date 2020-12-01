import { Ratio } from "../../types/additionalTypes"
import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetHorizontalScalingRationAction = {
    type: SetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO,
    ratio: Ratio
}


export const setHorizontalScalingRatio = (ratio: Ratio): SetHorizontalScalingRationAction => {
    return {
        type: SetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO,
        ratio
    }
}