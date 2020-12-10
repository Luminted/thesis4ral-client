import { ESetterActionTypeKeys, TActionTypes } from "../actions";

const initialState = {
    x: 0,
    y: 0
}

export const tablePosition = (state: {x: number, y: number} = initialState, action: TActionTypes) => {
        switch(action.type) {
            case ESetterActionTypeKeys.SET_TABLE_POSITION:
                return {
                    x: action.positionX,
                    y: action.positionY
                }
            default:
                return state;
        }
    }