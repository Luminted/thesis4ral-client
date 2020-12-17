import { TRatio } from "../typings";
import { ESetterActionTypeKeys } from "./actionTypeKeys";

export type TSetHorizontalScalingRationAction = {
  type: ESetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO;
  ratio: TRatio;
};

export const setHorizontalScalingRatio = (ratio: TRatio): TSetHorizontalScalingRationAction => {
  return {
    type: ESetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO,
    ratio,
  };
};
