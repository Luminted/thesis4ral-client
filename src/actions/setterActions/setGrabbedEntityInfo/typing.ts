import { EntityTypes } from "../../../types/dataModelDefinitions";
import { MaybeNull } from "../../../types/genericTypes";
import { SetActionTypeKeys } from "../actionTypes";

export type TGrabbedEntityInfo = {
    entityType: EntityTypes
    width: number,
    height: number,
    relativeGrabbedAtX: number,
    relativeGrabbedAtY: number,
    restricted: boolean,
    originalPositionX?: number,
    originalPositionY?: number,
    grabbedFromHand?: string,
}

export type SetGrabbedEntityInfo = {
    type: SetActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo: MaybeNull<TGrabbedEntityInfo>
}

