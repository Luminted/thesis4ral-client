import { MaybeNull } from "../../../types/genericTypes";
import { SetActionTypeKeys } from "../actionTypes";

export type TGrabbedEntityInfo = MaybeNull<{
    width: number,
    height: number,
    relativeGrabbedAtX: number,
    relativeGrabbedAtY: number,
    restricted: boolean,

}>

export type SetGrabbedEntityInfo = {
    type: SetActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo: TGrabbedEntityInfo
}

