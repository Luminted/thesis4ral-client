import { Middleware } from "redux";
import { ActionTypes, SocketActionTypeKeys } from "../../actions";
import { RootState } from "../../store";

export const joinedTableValidator: Middleware<{}, RootState> = store => next => (action: ActionTypes) => {
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