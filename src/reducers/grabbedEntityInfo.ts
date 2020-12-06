import { ESetterActionTypeKeys, TActionTypes } from "../actions";
import { TGrabbedEntityInfo, TMaybeNull } from "../typings";

const initialState = null;

export const grabbedEntityInfo = (state: TMaybeNull<TGrabbedEntityInfo> = initialState, action: TActionTypes) => {
    switch(action.type){
        case ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO:  
            return action.grabbedEntityInfo
        default:
            return state;
    }
}