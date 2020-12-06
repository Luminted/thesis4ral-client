import { ESetterActionTypeKeys, TActionTypes } from "../actions";

const initialState = {
    width: 0,
    height: 0
}

export const tablePixelDimensions = (state: {width: number, height: number} = initialState, action: TActionTypes) => {
    switch(action.type){
        case ESetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS:
            return action.dimensions;
        default:
            return state;
    }
}