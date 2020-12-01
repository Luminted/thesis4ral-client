import { SetClientInfoAction } from "./setClientInfo";
import { SetGameStateAction } from "./setGameState";
import { SetGrabbedEntityInfoAction } from "./setGrabbedEntityInfo";
import { SetHorizontalScalingRationAction } from "./setHorizontalScalingRatio";
import { SetTablePixelDimensionsAction } from "./setTablePixelDimensions";
import { SetTablePositionAction } from "./setTablePosition";
import { SetTableConnectionStatusAction } from "./setTableSocketStatus";
import { SetVerticalScalingRationAction } from "./setVerticalScalingRatio";
import { SocketConnectAction } from "./socketConnect";
import { SocketEmitVerbAction } from "./socketEmitVerb";
import { SocketJoinTableAction } from "./socketJoinTable";

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

export { SocketActionTypeKeys, SetterActionTypeKeys } from './actionTypeKeys'

export type ActionTypes = SocketActionTypes | SetterActionTypes;

export type SocketActionTypes = 
    SocketEmitVerbAction |
    SocketConnectAction |
    SocketJoinTableAction;

export type SetterActionTypes = 
    SetGameStateAction |
    SetClientInfoAction |
    SetTablePositionAction |
    SetTableConnectionStatusAction |
    SetVerticalScalingRationAction |
    SetHorizontalScalingRationAction |
    SetTablePixelDimensionsAction |
    SetGrabbedEntityInfoAction;

export * from "./thunks";