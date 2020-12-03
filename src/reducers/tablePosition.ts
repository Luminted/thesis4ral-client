import produce from "immer";
import { SetterActionTypeKeys, TActionTypes } from "../actions";

const initialState = {
    x: 0,
    y: 0
}

export const tablePosition = (state: {x: number, y: number} = initialState, action: TActionTypes) =>
    produce(state, draft => {
        switch(action.type) {
            case SetterActionTypeKeys.SET_TABLE_POSITION:
                draft.x = action.positionX;
                draft.y = action.positionY;
                break;
        }
    })