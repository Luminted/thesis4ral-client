import { EntityTypes } from "../../types/dataModelDefinitions";
import { MaybeNull } from "../../types/genericTypes";
import { SetterActionTypeKeys } from "../actionTypeKeys";

//TODO: move this to datamodeldefinitions eqv
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

export type SetGrabbedEntityInfoAction = {
    type: SetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo: MaybeNull<TGrabbedEntityInfo>
}

export const setGrabbedEntityInfo = (grabbedEntityInfo: MaybeNull<TGrabbedEntityInfo>): SetGrabbedEntityInfoAction => ({
    type: SetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo
})