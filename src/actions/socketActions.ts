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
    JOIN_TABLE = 'socket/JOIN_TABLE'
}

export type SocketEmitVerbAction = {
    type: SocketActionTypeKeys.EMIT_VERB,
    verb: Verb,
    ackFunction?: Function
}

type SocketJoinTableAckFunction = (clientInfo: ClientInfo, gameState: SerializedGameState) => any

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

function socketEmitVerb(verb: Verb, ackFunction?: Function): SocketEmitVerbAction{
    return {
        type: SocketActionTypeKeys.EMIT_VERB,
        verb,
        ackFunction
    }
}

//TODO: catch null verbs
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
        dispatch(socketEmitVerb(verb));
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
        dispatch(socketEmitVerb(verb));
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
        dispatch(socketEmitVerb(verb));
    }
}

export function emitDerivedVerb (event: SyntheticMouseEvent | SyntheticDragEvent, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>, verbContext: MaybeNull<VerbContextTypes> = null): ThunkResult<void>{
    return (dispatch, getStore) => {
        const store = getStore();
        const positionX = event.clientX;
        const positionY = event.clientY;
        const clientId = store.clientInfo?.clientId;
        const mouseInputType = mouseEventTranslator(event);
        const verb = verbFactory(mouseInputType, entityType, entityId, clientId, positionX, positionY, verbContext);
        console.log('Emitting verb: ', verb);
        if(verb !== null){
            dispatch(socketEmitVerb(verb));
        }else{
            console.log('Derived Verb is null. Aborting dispatch.')
        }
    }
}