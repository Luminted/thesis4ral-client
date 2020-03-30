import {produce} from 'immer';
import {ActionTypeKeys, ActionTypes} from './actions';
import {DisplayCardEntity, DeckEntity, GameState, ClientInfo} from './common/dataModelDefinitions' 
import {MaybeNull} from './common/genericTypes'

type InitialStateType = {
    gameState: GameState,
    socket: MaybeNull<SocketIOClient.Socket>
    clientInfo: ClientInfo
}

const initialState: InitialStateType = {
    gameState: {
        cards: new Array<DisplayCardEntity>(),
        decks: new Array<DeckEntity>(),
        clients: [],
        hands: []
    },
    socket: null,
    clientInfo: {
        //TODO: THIS IS WAY NOT COOL
        clientId: 'undefined',
        clientName: 'undefined'
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

