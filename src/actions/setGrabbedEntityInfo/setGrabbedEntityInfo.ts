import { EEntityTypes, TMaybeNull } from "../../typings";
import { ESetterActionTypeKeys } from "../actionTypeKeys";

//TODO: move this to datamodeldefinitions eqv
export type TGrabbedEntityInfo = {
    entityType: EEntityTypes
    width: number,
    height: number,
    relativeGrabbedAtX: number,
    relativeGrabbedAtY: number,
    restricted: boolean,
    originalPositionX?: number,
    originalPositionY?: number,
    grabbedFromHand?: string,
}

export type TSetGrabbedEntityInfoAction = {
    type: ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo: TMaybeNull<TGrabbedEntityInfo>
}

export const setGrabbedEntityInfo = (grabbedEntityInfo: TMaybeNull<TGrabbedEntityInfo>): TSetGrabbedEntityInfoAction => ({
    type: ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
    grabbedEntityInfo
})