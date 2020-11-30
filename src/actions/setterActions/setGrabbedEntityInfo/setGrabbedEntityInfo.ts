import { MaybeNull } from "../../../types/genericTypes";
import { SetActionTypeKeys } from "../actionTypes";
import { SetGrabbedEntityInfo, TGrabbedEntityInfo } from "./typing";

export const setGrabbedEntityInfo = (grabbedEntityInfo: MaybeNull<TGrabbedEntityInfo>): SetGrabbedEntityInfo => ({
    type: SetActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo
})