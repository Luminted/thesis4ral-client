import { Middleware } from "redux";
import { ESetterActionTypeKeys, ESocketActionTypeKeys, TActionTypes } from "../actions";
import { TRootState } from "../reducers";

const actionsGatedFromObserver: (ESetterActionTypeKeys | ESocketActionTypeKeys)[] = [
    ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    ESocketActionTypeKeys.EMIT_VERB
]

export const observerGateMiddleware: Middleware<{}, TRootState> = 
    ({getState}) => 
        next => 
            (action: TActionTypes) => {
                const {clientInfo} = getState();
                if(clientInfo || !actionsGatedFromObserver.includes(action.type)){
                    return next(action);
                }
            }