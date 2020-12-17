import { TSetClientInfoAction } from "./setClientInfo";
import { TSetGameStateAction } from "./setGameState";
import { TSetGrabbedEntityInfoAction } from "./setGrabbedEntityInfo";
import { TSetHorizontalScalingRationAction } from "./setHorizontalScalingRatio";
import { TSetIsMirroredAction } from "./setIsMirrored";
import { TSetTablePixelDimensionsAction } from "./setTablePixelDimensions";
import { TSetTablePositionAction } from "./setTablePosition";
import { TSetTableConnectionStatusAction } from "./setTableSocketStatus";
import { TSetVerticalScalingRationAction } from "./setVerticalScalingRatio";
import { TSocketEmitConnectAction } from "./socketEmitConnect";
import { TSocketEmitVerbAction } from "./socketEmitVerb";
import { TSocketEmitJoinTableAction } from "./socketEmitJoinTable";
import { TSocketEmitLeaveTableAction } from "./socketEmitLeaveTable";
import { TSocketEmitRejoinAction } from "./socketEmitRejoinTable";

export { setClientInfo } from "./setClientInfo";
export { setGameState } from "./setGameState";
export { setTablePosition } from "./setTablePosition";
export { setGrabbedEntityInfo } from "./setGrabbedEntityInfo";
export { setHorizontalScalingRatio } from "./setHorizontalScalingRatio";
export { setTablePixelDimensions } from "./setTablePixelDimensions";
export { setVerticalScalingRatio } from "./setVerticalScalingRatio";
export { setTableSocketStatus } from "./setTableSocketStatus";
export { setIsMirrored } from "./setIsMirrored";
export { socketEmitVerb } from "./socketEmitVerb";
export { socketEmitConnect as socketConnect } from "./socketEmitConnect";
export { socketEmitJoinTable as socketJoinTable } from "./socketEmitJoinTable";
export { socketEmitRejoinTable } from "./socketEmitRejoinTable";

export { ESocketActionTypeKeys, ESetterActionTypeKeys } from "./actionTypeKeys";

export type TActionTypes = TSocketActionTypes | TSetterActionTypes;

export type TSocketActionTypes = TSocketEmitVerbAction | TSocketEmitConnectAction | TSocketEmitJoinTableAction | TSocketEmitRejoinAction | TSocketEmitLeaveTableAction;

export type TSetterActionTypes =
  | TSetGameStateAction
  | TSetClientInfoAction
  | TSetTablePositionAction
  | TSetTableConnectionStatusAction
  | TSetVerticalScalingRationAction
  | TSetHorizontalScalingRationAction
  | TSetTablePixelDimensionsAction
  | TSetGrabbedEntityInfoAction
  | TSetIsMirroredAction;

export * from "./thunks";
