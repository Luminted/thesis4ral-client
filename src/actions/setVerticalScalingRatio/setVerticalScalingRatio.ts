import { Ratio } from "../../typings"
import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetVerticalScalingRationAction = {
    type: SetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
    ratio: Ratio
}

export const setVerticalScalingRatio = (ratio: Ratio): SetVerticalScalingRationAction => {
    return {
        type: SetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
        ratio
    }
}