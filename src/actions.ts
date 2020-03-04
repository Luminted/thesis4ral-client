import {GameState, EntityTypes, ClientInfo} from './common/dataModelDefinitions';
import {MouseInput} from './common/mouseEventTypes';
import {mouseInputEventFactory} from './controller'
import { MouseEvent as SyntheticMouseEvent } from 'react';
import {MaybeUndefined} from './common/genericTypes'


export enum ActionTypeKeys {
    SYNC = 'SYNC',
    CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET',
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',

    EMIT_MOUSE_INPUT = 'emit/MOUSE_INPUT',
}

export type ActionTypes = 
emitMouseInput |
SyncAction |
ConnectToSocketAction |
SetClientInfoAction;

interface emitMouseInput {
    type: ActionTypeKeys.EMIT_MOUSE_INPUT,
    input: MouseInput
}

interface SyncAction {
    type: ActionTypeKeys.SYNC,
    gameState: GameState
}

interface ConnectToSocketAction {
    type: ActionTypeKeys.CONNECT_TO_SOCKET,
    socket: SocketIOClient.Socket
}

interface SetClientInfoAction {
    type: ActionTypeKeys.SET_CLIENT_INFO,
    clientInfo: ClientInfo
}

export function connectToSocket(socket: SocketIOClient.Socket){
    return {
        type: ActionTypeKeys.CONNECT_TO_SOCKET,
        socket
    }
}

export function emitMouseInput(event: SyntheticMouseEvent, clientId: string, entityId: MaybeUndefined<string>, entityType: MaybeUndefined<EntityTypes>){
    const input = mouseInputEventFactory(event, clientId, entityId, entityType);
    if(input)
    {
        return {
            type: ActionTypeKeys.EMIT_MOUSE_INPUT,
            input
        }
    }
}

export function setClientInfo(clientInfo: ClientInfo) {
    const action: SetClientInfoAction = {
        type: ActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
    return action;
}

export function sync(gameState: GameState) {
    const action: SyncAction = {
        type: ActionTypeKeys.SYNC ,
        gameState
    }
  return action;
}