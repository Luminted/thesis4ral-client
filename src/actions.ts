import {GameState, EntityTypes, ClientInfo} from './common/dataModelDefinitions';
import {verbFactory, mouseInputTypeFactory} from './controller'
import { MouseEvent as SyntheticMouseEvent } from 'react';
import {MaybeNull} from './common/genericTypes'
import { Verb } from './common/verbTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';


export enum ActionTypeKeys {
    SYNC = 'SYNC',
    CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET',
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',

    EMIT_VERB = 'emit/VERB',
}

export type ThunkResult<R> = ThunkAction<R, RootState, null, ActionTypes>

export type ActionTypes = 
EmitVerb |
SyncAction |
ConnectToSocketAction |
SetClientInfoAction;

interface EmitVerb {
    type: ActionTypeKeys.EMIT_VERB,
    verb: Verb
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

export function emitVerb (event: SyntheticMouseEvent, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>): ThunkResult<EmitVerb | void>{
    return (dispatch, getStore) => {
        const store = getStore();
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        const clientId = store.clientInfo?.clientId;
    
        const mouseInputType = mouseInputTypeFactory(event);
        if(clientId){
            const verb = verbFactory(mouseInputType, entityType, entityId, clientId, cursorX, cursorY);
            console.log('Emitting verb: ', verb)
            if(verb !== null) {
               dispatch({
                   type: ActionTypeKeys.EMIT_VERB,
                   verb
               });
            }
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