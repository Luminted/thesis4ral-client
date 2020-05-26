import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { SocketEmitVerbAction, SocketConnectAction, SocketDisconnectAction, SocketJoinTableAction, SocketGetTableDimensionsAction } from "./socketActions";
import { SetGameStateAction, SetClientInfoAction, SetTablePositionAction, SetTableConnectionStatusAction, SetTablePixelDimensions, SetTableReadyAction, SetTableVirtualDimensions, SetHorizontalScalingRation, SetVerticalScalingRation, SetOrientationAction } from "./setterActions";

export {setClientInfo, setGameState, setTablePosition, setHorizontalScalingRatio, setVerticalScalingRatio, setTableVirtualDimensions, setTableReady, setOrientationAction, setTableSocketStatus, SetActionTypeKeys} from './setterActions'
export { SocketActionTypeKeys } from './socketActions'
export {emitCardVerb, emitDeckVerb, emitDerivedVerb, emitSharedVerb, readyTable} from './thunks'

export type ThunkResult<R> = ThunkAction<R, RootState, null, ActionTypes>

export type ActionTypes = SocketActionTypes | SetterActionTypes;

export type SocketActionTypes = 
    SocketEmitVerbAction |
    SocketConnectAction |
    SocketDisconnectAction |
    SocketJoinTableAction |
    SocketGetTableDimensionsAction;

export type SetterActionTypes = 
    SetGameStateAction |
    SetClientInfoAction |
    SetTablePositionAction |
    SetTableConnectionStatusAction |
    SetTableReadyAction |
    SetVerticalScalingRation |
    SetHorizontalScalingRation |
    SetOrientationAction |
    SetTableVirtualDimensions |
    SetTablePixelDimensions;
