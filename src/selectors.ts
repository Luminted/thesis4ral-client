import {GrabbedEntity, ClientHand, Client, BaseCard} from './common/dataModelDefinitions';
import {RootState} from './store'
import { MaybeUndefined, MaybeNull } from './common/genericTypes';

export function selectGrabbedEntityByClientId(clientId: string) {
    return function (store: RootState): MaybeNull<GrabbedEntity> {
        return store.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy || null;
    }
}

export function selectGrabbrdEntityOfCurrentClient(store: RootState): MaybeNull<GrabbedEntity>{ 
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

export function selectClientHandCardsById(clientId: string){
    return function(store: RootState): BaseCard[] {
        let hand = store.gameState.hands.find(hand => hand.clientId === clientId);
        return hand ? hand.cards : [];
    }
}

export function selectTablePosition(state: RootState){
    return state.tablePosition;
}