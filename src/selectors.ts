import {RootState} from './store'
import { MaybeNull } from './typings';   

export const selectGrabbedEntity = (state: RootState) =>{ 
    const clientId = state.clientInfo?.clientId;
    if(clientId) {
        return state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntity || null;
    }
    return null;
}

export const selectClients = (state: RootState) => {
    return state.gameState.clients;
}

export const selectClientInfoById = (clientId: string) => {
    return (state: RootState) => {
        const clientInfo = state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.clientInfo;
        return clientInfo ? clientInfo : null;
    }
}

export const selectClientHandById = (clientId: MaybeNull<string>) =>
    (state: RootState) => state.gameState.hands.find(hand => hand.clientId === clientId) || null;

export const selectTablePosition = (state: RootState) => {
    return state.tablePosition;
}

export const selectCards = (state: RootState) => {
    return state.gameState.cards;
}

export const selectDecks = (state: RootState) => state.gameState.decks;


export const selectTableConnectionStatus = (state: RootState) => {
    return state.tableConnectionStatus;
}

export const selectOwnClientInfo = (state: RootState) => {
    return state.clientInfo;
}

export const selectClientId = (state: RootState) => {
    return state.clientInfo ? state.clientInfo.clientId : null;
}

export const selectEntityScale = (state: RootState) => {
    return state.gameState.entityScale;
}

export const selectTablePixelDimensions = (state: RootState) => state.tablePixelDimensions;

export const selectGrabbedEntityInfo = (state: RootState) => state.grabbedEntityInfo;

export const selectClientSeatId = (clientId: MaybeNull<string>) => 
    (state: RootState) => {
        const client = state.gameState.clients.find(({clientInfo}) => clientInfo.clientId === clientId );
        return client ? client.clientInfo.seatId : null;
    } 