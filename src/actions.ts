import {GameState, EntityTypes, ClientInfo} from './common/dataModelDefinitions';
import { MouseEvent as SyntheticMouseEvent, DragEvent as SyntheticDragEvent } from 'react';
import {MaybeNull} from './common/genericTypes'
import { Verb, SharedVerbTypes, CardVerbTypes, DeckVerbTypes } from './common/verbTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { mouseEventTranslator, verbFactory } from './controller';


export enum ActionTypeKeys {
    SYNC = 'SYNC',
    CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET',
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',

    EMIT_VERB = 'emit/VERB',

    SET_TABLE_POSITION = 'SET_TABLE_POSITION'
}

export type ThunkResult<R> = ThunkAction<R, RootState, null, ActionTypes>

export type ActionTypes = 
EmitVerb |
SyncAction |
ConnectToSocketAction |
SetClientInfoAction |
SetTablePositionAction;

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

interface SetTablePositionAction {
    type: ActionTypeKeys.SET_TABLE_POSITION,
    positionX: number,
    positionY: number
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

export function emitSharedVerb(positionX: number, positionY: number, verbType: SharedVerbTypes, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType,
            clientId,
            positionX,
            positionY,
            entityId,
        }
        dispatch(emitVerb(verb));
    } 
}

export function emitCardVerb(positionX: number, positionY: number, verbType: CardVerbTypes, entityId: MaybeNull<string>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType: EntityTypes.CARD,
            clientId,
            positionX,
            positionY,
            entityId,
        }
        console.log('Emitting verb: ', verb)
        dispatch(emitVerb(verb));
    }
}

export function emitDeckVerb(positionX: number, positionY: number, verbType: DeckVerbTypes, entityId: MaybeNull<string>): ThunkResult<void> {
    return (dispatch, getStore) => {
        const store = getStore();
        const clientId = store.clientInfo?.clientId;
        const verb: Verb = {
            type: verbType,
            entityType: EntityTypes.DECK,
            clientId,
            positionX,
            positionY,
            entityId,
        }
        console.log('Emitting verb: ', verb)
        dispatch(emitVerb(verb));
    }
}

export function emitDerivedVerb (event: SyntheticMouseEvent | SyntheticDragEvent, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>): ThunkResult<void>{
    return (dispatch, getStore) => {
        const store = getStore();
        const positionX = event.clientX;
        const positionY = event.clientY;
        const clientId = store.clientInfo?.clientId;
    
        const mouseInputType = mouseEventTranslator(event);
        console.log(mouseInputType)
        if(clientId){
            const verb = verbFactory(mouseInputType, entityType, entityId, clientId, positionX, positionY);
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

export function setTablePosition(positionX: number, positionY: number): SetTablePositionAction{
    return {
        type: ActionTypeKeys.SET_TABLE_POSITION,
        positionX,
        positionY
    }
}