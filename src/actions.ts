import {GameState, EntityTypes, ClientInfo} from './types/dataModelDefinitions';
import { MouseEvent as SyntheticMouseEvent, DragEvent as SyntheticDragEvent } from 'react';
import {MaybeNull} from './types/genericTypes'
import { Verb, SharedVerbTypes, CardVerbTypes, DeckVerbTypes } from './types/verbTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { mouseEventTranslator, verbFactory } from './controller';
import { VerbContextTypes } from './types/additionalTypes';


export enum ActionTypeKeys {
    SYNC = 'SYNC',
    CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET',
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',

    EMIT_VERB = 'emit/VERB',

    SET_TABLE_POSITION = 'SET_TABLE_POSITION',
    SET_TABLE_BOUNDARIES = 'SET_TABLE_BOUNDARIES',
    
    SET_PLAYAREA_BOUNDARIES = 'SET_PLAYAREA_BOUNDARIES',

    SET_GRABBED_ENTITY_ORIGINAL_POSITION = 'SET_GRABBED_ENTITY_ORIGINAL_POSITION'
}

export type ThunkResult<R> = ThunkAction<R, RootState, null, ActionTypes>

export type ActionTypes = 
EmitVerb |
SyncGameStateAction |
ConnectToSocketAction |
SetClientInfoAction |
SetTablePositionAction |
SetTableBoundaries | 
SetPlayareaBoundaries |
SetEntityOriginalPosition;

interface SetEntityOriginalPosition {
    type: ActionTypeKeys.SET_GRABBED_ENTITY_ORIGINAL_POSITION,
    position: MaybeNull<{
        x: number,
        y: number
    }>
}
interface EmitVerb {
    type: ActionTypeKeys.EMIT_VERB,
    verb: MaybeNull<Verb>
}

interface SyncGameStateAction {
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

interface SetTableBoundaries {
    type: ActionTypeKeys.SET_TABLE_BOUNDARIES,
    top: number,
    bottom: number,
    left: number,
    right: number
}

interface SetPlayareaBoundaries {
    type: ActionTypeKeys.SET_PLAYAREA_BOUNDARIES,
    top: number,
    bottom: number,
    left: number,
    right: number
}

export function connectToSocket(socket: SocketIOClient.Socket){
    return {
        type: ActionTypeKeys.CONNECT_TO_SOCKET,
        socket
    }
}

export function setGrabbedEntityOriginalPosition(position: MaybeNull<{x: number, y: number}>): SetEntityOriginalPosition{
    return {
        type: ActionTypeKeys.SET_GRABBED_ENTITY_ORIGINAL_POSITION,
        position
    }
}

export function setTableBoundaries(top: number, bottom: number, left: number, right: number): SetTableBoundaries {
    return {
        type: ActionTypeKeys.SET_TABLE_BOUNDARIES,
        top,
        bottom,
        left,
        right
    }
}

export function setPlayareaBoundaries(top: number, bottom: number, left: number, right: number): SetPlayareaBoundaries {
    return {
        type: ActionTypeKeys.SET_PLAYAREA_BOUNDARIES,
        top,
        bottom,
        left,
        right
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
        // console.log('Emitting verb: ', verb)
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
        // console.log('Emitting verb: ', verb)
        dispatch(emitVerb(verb));
    }
}

export function emitDerivedVerb (event: SyntheticMouseEvent | SyntheticDragEvent, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>, verbContext: MaybeNull<VerbContextTypes> = null): ThunkResult<void>{
    return (dispatch, getStore) => {
        const store = getStore();
        const positionX = event.clientX;
        const positionY = event.clientY;
        const clientId = store.clientInfo?.clientId;
        const mouseInputType = mouseEventTranslator(event);
        if(clientId){
            const verb = verbFactory(mouseInputType, entityType, entityId, clientId, positionX, positionY, verbContext);
            console.log('Emitting verb: ', verb);
            dispatch(emitVerb(verb));
        }
    }
}

//TODO: give return types to all action
export function setClientInfo(clientInfo: ClientInfo): SetClientInfoAction {
    return {
        type: ActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}

export function syncGameState(gameState: GameState) {
    const action: SyncGameStateAction = {
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