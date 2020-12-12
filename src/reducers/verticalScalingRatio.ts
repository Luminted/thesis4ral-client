import { ESetterActionTypeKeys, TActionTypes } from "../actions";
import { TRatio } from "../typings";

const initialState = {
  numerator: 1,
  divisor: 1,
};

export const verticalScalingRatio = (state: TRatio = initialState, action: TActionTypes) => {
  switch (action.type) {
    case ESetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO:
      return action.ratio;
    default:
      return state;
  }
};
