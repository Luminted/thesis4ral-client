import {produce} from 'immer';
import {ActionTypeKeys, ActionTypes} from './actions';
import {CardEntity, DeckEntity, GameState, ClientInfo, Directions} from './types/dataModelDefinitions' 
import {MaybeNull} from './types/genericTypes'

type State = {
    gameState: GameState,
    socket: MaybeNull<SocketIOClient.Socket>
    clientInfo: ClientInfo,
    tablePosition: {
        x: number,
        y: number
    },
    //TODO: swap in Boundary type
    tableBoundaries: MaybeNull<{
        top: number,
        bottom: number,
        left: number,
        right: number
    }>
    playareaBoundaries: MaybeNull<{
        top: number,
        bottom: number,
        left: number,
        right: number
    }>
    grabbedEntityOriginalPosition: MaybeNull<{
        x: number,
        y: number
    }>
}

const initialState: State = {
    gameState: {
        cards: new Array<CardEntity>(),
        decks: new Array<DeckEntity>(),
        clients: [],
        hands: [],
        cardScale: 1,
        cardBoundary: null,
        deckBoundary: null,
        emptySeats:[],
        topZIndex: 0
    },
    socket: null,
    clientInfo: {
        //TODO: THIS IS WAY NOT COOL
        clientId: 'undefined',
        clientName: 'undefined',
        seatedAt: Directions.SOUTH
    },
    tablePosition: {
        x: 0,
        y: 0
    },
    tableBoundaries: null,
    playareaBoundaries: null,
    grabbedEntityOriginalPosition: null
}

export const grabbedEntityOriginalPosition = (state = initialState.grabbedEntityOriginalPosition, action: ActionTypes) => {
    switch(action.type){
        case ActionTypeKeys.SET_GRABBED_ENTITY_ORIGINAL_POSITION:
            return action.position;
        default:
            return state;
    }
}

export const gameState = (state = initialState.gameState, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type){
            case ActionTypeKeys.SYNC:
                const {cards, decks, clients, hands} = action.gameState;
                draft.cards = cards;
                draft.decks = decks;
                draft.clients = clients;
                draft.hands = hands;
                break;
        }
    })

export const socket = (state = initialState.socket, action: ActionTypes) => {
    switch(action.type){
        case ActionTypeKeys.CONNECT_TO_SOCKET:
            return action.socket;
        default:
            return state;
    }
}

export const clientInfo = (state =initialState.clientInfo, action: ActionTypes) => {
    switch(action.type){
        case ActionTypeKeys.SET_CLIENT_INFO:
            return action.clientInfo;
        default:
            return state;
    }
}

export const tablePosition = (state = initialState.tablePosition, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type) {
            case ActionTypeKeys.SET_TABLE_POSITION:
                draft.x = action.positionX;
                draft.y = action.positionY;
                break;
        }
    })

export const tableBoundaries = (state = initialState.tableBoundaries, action: ActionTypes) => {
    switch(action.type) {
        case ActionTypeKeys.SET_TABLE_BOUNDARIES:
            const {top, bottom, left, right} = action;
            return {
                top,
                bottom,
                left,
                right
            }
        default:
            return state;
        }
}

export const playareaBoundaries = (state = initialState.playareaBoundaries, action: ActionTypes) => {
    switch(action.type) {
        case ActionTypeKeys.SET_PLAYAREA_BOUNDARIES:
            const {top, bottom, left, right} = action;
            return {
                top,
                bottom,
                left,
                right
            }

        default:
            return state;
        }
}
