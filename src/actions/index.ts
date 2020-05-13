import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { SocketEmitVerbAction, SocketConnectAction, SocketDisconnectAction } from "./socketActions";
import { SetGameStateAction, SetClientInfoAction, SetTablePositionAction, SetTableBoundariesAction, SetPlayareaBoundariesAction } from "./setterActions";

export {setClientInfo, setPlayareaBoundaries, setTableBoundaries, setGameState, setTablePosition, SetActionTypeKeys, } from './setterActions'
export {emitCardVerb, emitDeckVerb, emitDerivedVerb, emitSharedVerb, SocketActionTypeKeys } from './socketActions'

export type ThunkResult<R> = ThunkAction<R, RootState, null, ActionTypes>

export type ActionTypes = SocketActionTypes | SetterActionTypes;

export type SocketActionTypes = 
    SocketEmitVerbAction |
    SocketConnectAction |
    SocketDisconnectAction;

export type SetterActionTypes = 
    SetGameStateAction |
    SetClientInfoAction |
    SetTablePositionAction |
    SetTableBoundariesAction | 
    SetPlayareaBoundariesAction;