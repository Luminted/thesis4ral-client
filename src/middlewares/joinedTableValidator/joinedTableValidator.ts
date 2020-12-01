import { Middleware } from "redux";
import { TActionTypes, SocketActionTypeKeys } from "../../actions";
import { TRootState } from "../../store";

export const joinedTableValidator: Middleware<{}, TRootState> = store => next => (action: TActionTypes) => {
    if(action.type === SocketActionTypeKeys.EMIT_VERB){
        if(store.getState().clientInfo){
            return next(action);
        }
        else {
            return;
        }
    }
    
    return next(action);
}