import { Verb } from "../types/verbTypes";
import { ClientInfo, SerializedGameState } from "../types/dataModelDefinitions";

export enum SocketActionTypeKeys {
    EMIT_VERB = 'socket/EMIT_VERB',
    CONNECT = 'socket/CONNECT',
    DISCONNECT = 'socket/DISCONNECT',
    JOIN_TABLE = 'socket/JOIN_TABLE',
}

export type SocketEmitVerbAction = {
    type: SocketActionTypeKeys.EMIT_VERB,
    verb: Verb,
    ackFunction?: Function
}

type SocketJoinTableAckFunction = (clientInfo: ClientInfo, gameState: SerializedGameState) => void

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