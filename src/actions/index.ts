import { TSetClientInfoAction } from "./setClientInfo";
import { TSetGameStateAction } from "./setGameState";
import { TSetGrabbedEntityInfoAction } from "./setGrabbedEntityInfo";
import { TSetHorizontalScalingRationAction } from "./setHorizontalScalingRatio";
import { TSetTablePixelDimensionsAction } from "./setTablePixelDimensions";
import { TSetTablePositionAction } from "./setTablePosition";
import { TSetTableConnectionStatusAction } from "./setTableSocketStatus";
import { TSetVerticalScalingRationAction } from "./setVerticalScalingRatio";
import { TSocketConnectAction } from "./socketConnect";
import { TSocketEmitVerbAction } from "./socketEmitVerb";
import { TSocketJoinTableAction } from "./socketJoinTable";
import { TSocketLeaveTableAction } from "./socketLeaveTable/socketLeaveTable";
import { TSocketRejoinAction } from "./socketRejoinTable/socketRejoinTable";

export {setClientInfo} from "./setClientInfo"
export {setGameState} from "./setGameState"
export {setTablePosition} from "./setTablePosition";
export { setGrabbedEntityInfo } from "./setGrabbedEntityInfo";
export {setHorizontalScalingRatio} from "./setHorizontalScalingRatio"
export { setTablePixelDimensions } from "./setTablePixelDimensions";
export {setVerticalScalingRatio} from "./setVerticalScalingRatio"
export {setTableSocketStatus} from "./setTableSocketStatus"
export {socketEmitVerb} from "./socketEmitVerb";
export {socketConnect} from "./socketConnect";
export {socketJoinTable} from "./socketJoinTable"
export {socketRejoinTable} from "./socketRejoinTable";

export { ESocketActionTypeKeys, ESetterActionTypeKeys } from './actionTypeKeys'

export type TActionTypes = TSocketActionTypes | TSetterActionTypes;

export type TSocketActionTypes = 
    TSocketEmitVerbAction |
    TSocketConnectAction |
    TSocketJoinTableAction |
    TSocketRejoinAction |
    TSocketLeaveTableAction;

export type TSetterActionTypes = 
    TSetGameStateAction |
    TSetClientInfoAction |
    TSetTablePositionAction |
    TSetTableConnectionStatusAction |
    TSetVerticalScalingRationAction |
    TSetHorizontalScalingRationAction |
    TSetTablePixelDimensionsAction |
    TSetGrabbedEntityInfoAction;

export * from "./thunks";