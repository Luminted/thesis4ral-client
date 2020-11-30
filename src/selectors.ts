import {GrabbedEntity, Client, ICardEntity} from './types/dataModelDefinitions';
import {RootState} from './store'
import { MaybeNull } from './types/genericTypes';   

export function selectGrabbedEntity(state: RootState): MaybeNull<GrabbedEntity>{ 
    const clientId = state.clientInfo?.clientId;
    if(clientId) {
        return state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntity || null;
    }
    return null;
}

export function selectClients(state: RootState): Client[] {
    return state.gameState.clients;
}

export function selectClientInfoById(clientId: string) {
    return function(state: RootState){
        const clientInfo = state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.clientInfo;
        return clientInfo ? clientInfo : null;
    }
}

export const selectClientHandById = (clientId: MaybeNull<string>) =>
    (state: RootState) => state.gameState.hands.find(hand => hand.clientId === clientId) || null;

export function selectTablePosition(state: RootState){
    return state.tablePosition;
}

export function selectCards(state: RootState): ICardEntity[] {
    return state.gameState.cards;
}

export const selectDecks = (state: RootState) => state.gameState.decks;


export function selectTableConnectionStatus(state: RootState) {
    return state.tableConnectionStatus;
}

export function selectOwnClientInfo(state: RootState) {
    return state.clientInfo;
}

export function selectClientId(state: RootState){
    return state.clientInfo ? state.clientInfo.clientId : null;
}

export function selectEntityScale(state: RootState) {
    return state.gameState.entityScale;
}

export const selectDeckById = (entityId: string) => 
    (state: RootState) => state.gameState.decks.find(deck => deck.entityId === entityId) || null;

export const selectTablePixelDimensions = (state: RootState) => state.tablePixelDimensions;

export const selectGrabbedEntityInfo = (state: RootState) => state.grabbedEntityInfo;