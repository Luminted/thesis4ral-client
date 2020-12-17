import { TGrabbedEntityInfo, TMaybeNull } from "../typings";
import { ESetterActionTypeKeys } from "./actionTypeKeys";

export type TSetGrabbedEntityInfoAction = {
  type: ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO;
  grabbedEntityInfo: TMaybeNull<TGrabbedEntityInfo>;
};

export const setGrabbedEntityInfo = (grabbedEntityInfo: TMaybeNull<TGrabbedEntityInfo>): TSetGrabbedEntityInfoAction => ({
  type: ESetterActionTypeKeys.SET_GRABBED_ENTITY_INFO,
  grabbedEntityInfo,
});
