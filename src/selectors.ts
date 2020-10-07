import {GrabbedEntity, ClientHand, Client, DeckEntity, CardRepresentation, CardEntity} from './types/dataModelDefinitions';
import {RootState} from './store'
import { MaybeNull } from './types/genericTypes';

export function selectGrabbedEntityByClientId(clientId: MaybeNull<string>) {
    return function (state: RootState): MaybeNull<GrabbedEntity> {
        if(clientId){
            return state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy || null;
        }
        else{
            return null;
        }
    }
}

export function selectGrabbedEntity(state: RootState): MaybeNull<GrabbedEntity>{ 
    const clientId = state.clientInfo?.clientId;
    //TODO: THIS CHECK IS WAY NOT COOL
    if(clientId !== 'undefined') {
        return state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy || null;
    }
    return null;
}

export function selectHands(state: RootState): ClientHand[] {
    return state.gameState.hands;
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

export function selectClientHandById(clientId: MaybeNull<string>){
    return function(state: RootState): CardRepresentation[] {
        let hand = state.gameState.hands.find(hand => hand.clientId === clientId);
        return hand ? hand.cards : [];
    }
}

export function selectTablePosition(state: RootState){
    return state.tablePosition;
}

export function selectCards(state: RootState): CardEntity[] {
    return state.gameState.cards;
}

export function selectDecks(state: RootState): DeckEntity[] {
    return state.gameState.decks;
}

// export function selectGrabbedEntityOriginalPosition(state: RootState) {
//     return state.grabbedEntityOriginalPosition;
// }

export function selectTableConnectionStatus(state: RootState) {
    return state.tableConnectionStatus;
}

export function selectOwnClientInfo(state: RootState) {
    return state.clientInfo;
}

export function selectClientId(state: RootState){
    return state.clientInfo ? state.clientInfo.clientId : null
}

export function selectTableReady(state: RootState){
    return state.tableReady;
}

export function selectHorizontalScalingRatio(state: RootState){
    return state.horizontalScalingRatio;
}

export function selectVerticalScalingRatio(state: RootState){
    return state.verticalScalingRatio;
}

export function selectEntityScale(state: RootState) {
    return state.gameState.entityScale;
}