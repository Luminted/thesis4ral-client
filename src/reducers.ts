import {produce} from 'immer';
import {TActionTypes, SetterActionTypeKeys} from './actions/';
import { TClientInfo, TMaybeNull, ESocketConnectionStatuses, TRatio, TSerializedGameState} from './typings' 
import { TGrabbedEntityInfo } from './actions/setGrabbedEntityInfo';

type State = {
    gameState: TSerializedGameState,
    clientInfo: TMaybeNull<TClientInfo>,
    tablePosition: {
        x: number,
        y: number
    },
    tablePixelDimensions: TMaybeNull<{
        width: number,
        height: number
    }>
    horizontalScalingRatio: TRatio,
    verticalScalingRatio: TRatio,
    tableConnectionStatus: ESocketConnectionStatuses,
    grabbedEntityInfo: TMaybeNull<TGrabbedEntityInfo>
}

const initialState: State = {
    gameState: {
        cards: [],
        decks: [],
        clients: [],
        hands: [],
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
    tableConnectionStatus: ESocketConnectionStatuses.DISCONNECTED,
    grabbedEntityInfo: null
}

export const tablePixelDimensions = (state = initialState.tablePixelDimensions, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS:
            return action.dimensions;
        default:
            return state;
    }
}

export const horizontalScalingRatio = (state = initialState.horizontalScalingRatio, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

export const verticalScalingRatio = (state = initialState.verticalScalingRatio, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_VERTICAL_SCALING_RATIO:
            return action.ratio;
        default:
            return state;
    }
}

export const tableConnectionStatus = (state = initialState.tableConnectionStatus, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS:
            return action.status;
        default:
            return state;
    }
}

export const gameState = (state = initialState.gameState, action: TActionTypes) =>
    produce(state, draft => {
        switch(action.type){
            case SetterActionTypeKeys.SET_GAME_STATE:
                const {cards, decks, clients, hands} = action.gameState;
                draft.cards = cards;
                draft.decks = decks;
                draft.clients = clients;
                draft.hands = hands;
                break;
            }
    })

export const clientInfo = (state =initialState.clientInfo, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_CLIENT_INFO:
            return action.clientInfo;
        default:
            return state;
    }
}

export const tablePosition = (state = initialState.tablePosition, action: TActionTypes) =>
    produce(state, draft => {
        switch(action.type) {
            case SetterActionTypeKeys.SET_TABLE_POSITION:
                draft.x = action.positionX;
                draft.y = action.positionY;
                break;
        }
    })

export const grabbedEntityInfo = (state = initialState.grabbedEntityInfo, action: TActionTypes) => {
    switch(action.type){
        case SetterActionTypeKeys.SET_GRABBED_ENTITY_INFO:  
            return action.grabbedEntityInfo
        default:
            return state;
    }
}

