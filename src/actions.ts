import {GameState, EntityTypes, ClientInfo} from './common/dataModelDefinitions';
import {verbFactory, mouseInputTypeFactory} from './controller'
import { MouseEvent as SyntheticMouseEvent } from 'react';
import {MaybeNull} from './common/genericTypes'
import { Verb, SharedVerbTypes, CardVerbTypes, DeckVerbTypes } from './common/verbTypes';
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
    verb: MaybeNull<Verb>
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

function emitVerb(verb: MaybeNull<Verb>): EmitVerb{
    return {
        type: ActionTypeKeys.EMIT_VERB,
        verb
    }
}

export function emitSharedVerb(cursorX: number, cursorY: number, verbType: SharedVerbTypes, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType,
            clientId,
            cursorX,
            cursorY,
            entityId,
        }
        dispatch(emitVerb(verb));
    } 
}

export function emitCardVerb(cursorX: number, cursorY: number, verbType: CardVerbTypes | SharedVerbTypes, entityId: MaybeNull<string>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType: EntityTypes.CARD,
            clientId,
            cursorX,
            cursorY,
            entityId,
        }
        console.log('Emitting verb: ', verb)
        dispatch(emitVerb(verb));
    }
}

export function emitDeckVerb(cursorX: number, cursorY: number, verbType: DeckVerbTypes | SharedVerbTypes, entityId: MaybeNull<string>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType: EntityTypes.DECK,
            clientId,
            cursorX,
            cursorY,
            entityId,
        }
        console.log('Emitting verb: ', verb)
        dispatch(emitVerb(verb));
    }
}

export function emitDerivedVerb (event: SyntheticMouseEvent, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>): ThunkResult<void>{
    return (dispatch, getStore) => {
        const store = getStore();
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        const clientId = store.clientInfo?.clientId;
    
        const mouseInputType = mouseInputTypeFactory(event);
        if(clientId){
            const verb = verbFactory(mouseInputType, entityType, entityId, clientId, cursorX, cursorY);
            console.log('Emitting verb: ', verb)
            dispatch(emitVerb(verb));
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