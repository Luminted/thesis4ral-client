import { ESetterActionTypeKeys } from "../actionTypeKeys";

export type TSetIsMirroredAction = {
    type: ESetterActionTypeKeys.SET_IS_MIRRORED,
    isMirrored: boolean
}

export const setIsMirrored = (isMirrored: boolean): TSetIsMirroredAction => ({
    type: ESetterActionTypeKeys.SET_IS_MIRRORED,
    isMirrored
})