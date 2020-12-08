import { ESetterActionTypeKeys, TActionTypes } from "../actions";

const initialState = false;

export const isMirrored = (state = initialState, action: TActionTypes) => {
    switch(action.type){
        case ESetterActionTypeKeys.SET_IS_MIRRORED:
            return action.isMirrored;
        default:
            return state;
    }
}