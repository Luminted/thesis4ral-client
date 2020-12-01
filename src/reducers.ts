import {produce} from 'immer';
import {ActionTypes, SetterActionTypeKeys} from './actions/';
import { GameState, ClientInfo, MaybeNull, SocketConnectionStatuses, Ratio} from './typings' 
import { TGrabbedEntityInfo } from './actions/setGrabbedEntityInfo';

type State = {
    gameState: GameState,
    clientInfo: MaybeNull<ClientInfo>,
    tablePosition: {
        x: number,
        y: number
    },
    tablePixelDimensions: MaybeNull<{
        width: number,
        height: number
    }>
    horizontalScalingRatio: Ratio,
    verticalScalingRatio: Ratio,
    tableConnectionStatus: SocketConnectionStatuses,
    grabbedEntityInfo: MaybeNull<TGrabbedEntityInfo>
}

const initialState: State = {
    gameState: {
        cards: [],
        decks: [],
        clients: [],
        hands: [],
        entityScale: 1,
        topZIndex: 0
    },
    clientInfo: null,
    tablePosition: {
        x: 0,
        y: 0
    },
    tablePixelDimensions: null,
    horizontalScalingRatio: {
        numerator: 1,
        divisor: 1
    },
    verticalScalingRatio: {
        numerator: 1,
        divisor: 1
    },
    tableConnectionStatus: SocketConnectionStatuses.DISCONNECTED,
    grabbedEntityInfo: null
}

export const tablePixelDimensions = (state = initialState.tablePixelDimensions, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS:
            return action.dimensions;
        default:
            return state;
    }
}

export const horizontalScalingRatio = (state = initialState.horizontalScalingRatio, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

export const verticalScalingRatio = (state = initialState.verticalScalingRatio, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

export const tableConnectionStatus = (state = initialState.tableConnectionStatus, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS:
            return action.status;
        default:
            return state;
    }
}

export const gameState = (state = initialState.gameState, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type){
            case SetterActionTypeKeys.SET_GAME_STATE:
                const {cards, decks, clients, hands, entityScale} = action.gameState;
                draft.cards = cards;
                draft.decks = decks;
                draft.clients = clients;
                draft.hands = hands;
                draft.entityScale = entityScale;
                break;
            }
    })

export const clientInfo = (state =initialState.clientInfo, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_CLIENT_INFO:
            return action.clientInfo;
        default:
            return state;
    }
}

export const tablePosition = (state = initialState.tablePosition, action: ActionTypes) =>
    produce(state, draft => {
        switch(action.type) {
            case SetterActionTypeKeys.SET_TABLE_POSITION:
                draft.x = action.positionX;
                draft.y = action.positionY;
                break;
        }
    })

export const grabbedEntityInfo = (state = initialState.grabbedEntityInfo, action: ActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_GRABBED_ENTITY_INFO:  
            return action.grabbedEntityInfo
        default:
            return state;
    }
}

