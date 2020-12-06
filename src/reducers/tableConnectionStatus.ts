import { ESetterActionTypeKeys, TActionTypes } from "../actions";
import { ESocketConnectionStatuses } from "../typings";

const initialState = ESocketConnectionStatuses.DISCONNECTED;

export const tableConnectionStatus = (state: ESocketConnectionStatuses = initialState, action: TActionTypes) => {
    switch(action.type){
        case ESetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS:
            return action.status;
        default:
            return state;
    }
}