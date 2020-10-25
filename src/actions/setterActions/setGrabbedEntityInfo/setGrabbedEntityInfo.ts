import { SetActionTypeKeys } from "../actionTypes";
import { SetGrabbedEntityInfo, TGrabbedEntityInfo } from "./typing";

export const setGrabbedEntityInfo = (grabbedEntityInfo: TGrabbedEntityInfo): SetGrabbedEntityInfo => ({
    type: SetActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo
})