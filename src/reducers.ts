import {produce} from 'immer';
import {ActionTypes} from './actions/';
import { GameState, ClientInfo} from './types/dataModelDefinitions' 
import {MaybeNull} from './types/genericTypes'
import { SocketConnectionStatuses, Ratio } from './types/additionalTypes';
import { SetActionTypeKeys } from './actions/setterActions/actionTypes';
import { TGrabbedEntityInfo } from './actions/setterActions/setGrabbedEntityInfo';

type State = {
    gameState: GameState,
    clientInfo: MaybeNull<ClientInfo>,
    tablePosition: {
        x: number,
        y: number
    },
    tableVirtualDimensions: MaybeNull<{
        width: number,
        height: number
    }>,
    tablePixelDimensions: MaybeNull<{
        width: number,
        height: number
    }>
    horizontalScalingRatio: Ratio,
    verticalScalingRatio: Ratio,
    tableConnectionStatus: SocketConnectionStatuses,
    tableReady: boolean,
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
    tableVirtualDimensions: null,
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
    tableReady: false,
    grabbedEntityInfo: null
}

export const tablePixelDimensions = (state = initialState.tableVirtualDimensions, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS:
            return action.dimensions;
        default:
            return state;
    }
}

export const tableVirtualDimensions = (state = initialState.tableVirtualDimensions, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_TABLE_VIRTUAL_DIMENSIONS:
            return action.dimensions;
        default:
            return state;
    }
}

export const tableReady = (state = initialState.tableReady, action: ActionTypes) => 
    produce(state, draft => {
        switch(action.type){
            case SetActionTypeKeys.SET_TABLE_READY:
                return action.ready;
            default:
                return state;
        }
    })


export const horizontalScalingRatio = (state = initialState.horizontalScalingRatio, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

export const verticalScalingRatio = (state = initialState.verticalScalingRatio, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_VERTICAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

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

export const grabbedEntityInfo = (state = initialState.grabbedEntityInfo, action: ActionTypes) => {
    switch(action.type){
        case SetActionTypeKeys.SET_GRABBED_ENTITY_INFO:  
            return action.grabbedEntityInfo
        default:
            return state;
    }
}

