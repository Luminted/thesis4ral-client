import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { SocketEmitVerbAction, SocketConnectAction, SocketDisconnectAction, SocketJoinTableAction } from "./socketActions";
import { SetGameStateAction, SetClientInfoAction, SetTablePositionAction, SetTableConnectionStatusAction, SetTablePixelDimensions, SetTableReadyAction, SetHorizontalScalingRation, SetVerticalScalingRation } from "./setterActions/setterActions";
import { SetGrabbedEntityInfo } from "./setterActions/setGrabbedEntityInfo/typing";

export {setClientInfo, setGameState, setTablePosition, setHorizontalScalingRatio, setVerticalScalingRatio, setTableReady, setTableSocketStatus} from './setterActions/setterActions'
export { SocketActionTypeKeys } from './socketActions'

export type ThunkResult = ThunkAction<void, RootState, null, ActionTypes>

export type ActionTypes = SocketActionTypes | SetterActionTypes;

export type SocketActionTypes = 
    SocketEmitVerbAction |
    SocketConnectAction |
    SocketDisconnectAction |
    SocketJoinTableAction;

export type SetterActionTypes = 
    SetGameStateAction |
    SetClientInfoAction |
    SetTablePositionAction |
    SetTableConnectionStatusAction |
    SetTableReadyAction |
    SetVerticalScalingRation |
    SetHorizontalScalingRation |
    SetTablePixelDimensions |
    SetGrabbedEntityInfo;

export * from "./thunks";