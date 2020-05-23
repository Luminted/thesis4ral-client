import {produce} from 'immer';
import {ActionTypes, SetActionTypeKeys} from './actions';
import {CardEntity, DeckEntity, GameState, ClientInfo, Seats} from './types/dataModelDefinitions' 
import {MaybeNull} from './types/genericTypes'
import { SocketConnectionStatuses } from './types/additionalTypes';

type State = {
    gameState: GameState,
    socket: MaybeNull<SocketIOClient.Socket>
    clientInfo: MaybeNull<ClientInfo>,
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
    tableConnectionStatus: SocketConnectionStatuses,
    tableReady: boolean
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
    clientInfo: null,
    tablePosition: {
        x: 0,
        y: 0
    },
    tableConnectionStatus: SocketConnectionStatuses.DISCONNECTED,
}

// export const grabbedEntityOriginalPosition = (state = initialState.grabbedEntityOriginalPosition, action: ActionTypes) => {
//     switch(action.type){
//         case SetActionTypeKeys.SET_GRABBED_ENTITY_ORIGINAL_POSITION:
//             return action.position;
//         default:
//             return state;
//     }
// }

export const tableConnectionStatus = (state = initialState.tableConnectionStatus, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_TABLE_CONNECTION_STATUS:
            return action.status;
        default:
            return state;
    }
}

export const gameState = (state = initialState.gameState, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type){
            case SetActionTypeKeys.SET_GAME_STATE:
                const {cards, decks, clients, hands} = action.gameState;
                draft.cards = cards;
                draft.decks = decks;
                draft.clients = clients;
                draft.hands = hands;
                break;
            }
    })

export const clientInfo = (state =initialState.clientInfo, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_CLIENT_INFO:
            return action.clientInfo;
        default:
            return state;
    }
}

export const tablePosition = (state = initialState.tablePosition, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type) {
            case SetActionTypeKeys.SET_TABLE_POSITION:
                draft.x = action.positionX;
                draft.y = action.positionY;
                break;
        }
    })

export const tableBoundaries = (state = initialState.tableBoundaries, action: ActionTypes) => {
    switch(action.type) {
        case SetActionTypeKeys.SET_TABLE_BOUNDARIES:
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
        case SetActionTypeKeys.SET_PLAYAREA_BOUNDARIES:
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
