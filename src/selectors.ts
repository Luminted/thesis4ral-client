import {GrabbedEntity, ClientHand, Client, DeckEntity, CardRepresentation, CardEntity} from './types/dataModelDefinitions';
import {RootState} from './store'
import { MaybeNull, MaybeUndefined } from './types/genericTypes';

export function selectGrabbedEntityByClientId(clientId: string) {
    return function (store: RootState): MaybeNull<GrabbedEntity> {
        return store.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy || null;
    }
}

export function selectGrabbedEntityOfCurrentClient(store: RootState): MaybeNull<GrabbedEntity>{ 
    const clientId = store.clientInfo.clientId;
    //TODO: THIS CHECK IS WAY NOT COOL
    if(clientId !== 'undefined') {
        return store.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy || null;
    }
    return null;
}

export function selectHands(store: RootState): ClientHand[] {
    return store.gameState.hands;
}

export function selectClientId(store: RootState): string {
    return store.clientInfo.clientId;
}

export function selectClients(store: RootState): Client[] {
    return store.gameState.clients;
}

export function selectClientHandCardsById(clientId: MaybeNull<string>){
    return function(store: RootState): CardRepresentation[] {
        let hand = store.gameState.hands.find(hand => hand.clientId === clientId);
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

export function selectTableBoundaries(state: RootState) {
    return state.tableBoundaries;
}

export function selectPlayareaBoundaries(state: RootState) {
    return state.playareaBoundaries;
}

// export function selectGrabbedEntityOriginalPosition(state: RootState) {
//     return state.grabbedEntityOriginalPosition;
// }

export function selectSeatedAt(state: RootState){
    return state.clientInfo.seatedAt;
}