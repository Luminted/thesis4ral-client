import { Verb, DeckVerbTypes, CardVerbTypes, SharedVerbTypes } from "../types/verbTypes";
import { MaybeNull } from "../types/genericTypes";
import { ThunkResult } from "../actions";
import { MouseEvent as SyntheticMouseEvent, DragEvent as SyntheticDragEvent } from 'react';
import { mouseEventTranslator, verbFactory } from '../controller';
import { VerbContextTypes } from '../types/additionalTypes';
import { EntityTypes, ClientInfo, SerializedGameState } from "../types/dataModelDefinitions";

export enum SocketActionTypeKeys {
    EMIT_VERB = 'socket/EMIT_VERB',
    CONNECT = 'socket/CONNECT',
    DISCONNECT = 'socket/DISCONNECT',
    JOIN_TABLE = 'socket/JOIN_TABLE',
    GET_TABLE_DIMENSIONS = 'socket/GET_TABLE_DIMENSIONS'
}

export type SocketEmitVerbAction = {
    type: SocketActionTypeKeys.EMIT_VERB,
    verb: Verb,
    ackFunction?: Function
}

type SocketJoinTableAckFunction = (clientInfo: ClientInfo, gameState: SerializedGameState) => void
type SocketGetTableDimensionsAckFunction = (tableWidth: number, tableHeight: number) => void

export type SocketGetTableDimensionsAction = {
    type: SocketActionTypeKeys.GET_TABLE_DIMENSIONS,
    ackFunction?: SocketGetTableDimensionsAckFunction
}

export type SocketJoinTableAction = {
    type: SocketActionTypeKeys.JOIN_TABLE
    ackFunction?: SocketJoinTableAckFunction
}

export type SocketDisconnectAction = {
    type: SocketActionTypeKeys.DISCONNECT
}

export type SocketConnectAction = {
    type: SocketActionTypeKeys.CONNECT
}

export function socketGetTableDimensions(ackFunction?: SocketGetTableDimensionsAckFunction): SocketGetTableDimensionsAction{
    return {
        type: SocketActionTypeKeys.GET_TABLE_DIMENSIONS,
        ackFunction
    }
}

export function socketJoinTable(ackFunction?: SocketJoinTableAckFunction): SocketJoinTableAction{
    return{
        type: SocketActionTypeKeys.JOIN_TABLE,
        ackFunction
    }
}

export function socketConnect(): SocketConnectAction {
    return {
        type: SocketActionTypeKeys.CONNECT
    }
}

export function socketEmitVerb(verb: Verb, ackFunction?: Function): SocketEmitVerbAction{
    return {
        type: SocketActionTypeKeys.EMIT_VERB,
        verb,
        ackFunction
    }
}