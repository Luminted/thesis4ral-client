import {TRootState} from './reducers'
import { TMaybeNull } from './typings';   

export const selectClients = (state: TRootState) => {
    return state.gameState.clients;
}

export const selectClientInfoById = (clientId: string) => {
    return (state: TRootState) => {
        const clientInfo = state.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.clientInfo;
        return clientInfo ? clientInfo : null;
    }
}

export const selectClientHandById = (clientId: TMaybeNull<string>) =>
    (state: TRootState) => state.gameState.hands.find(hand => hand.clientId === clientId) || null;

export const selectTablePosition = (state: TRootState) => {
    return state.tablePosition;
}

export const selectCards = (state: TRootState) => {
    return state.gameState.cards;
}

export const selectDecks = (state: TRootState) => state.gameState.decks;


export const selectTableConnectionStatus = (state: TRootState) => {
    return state.tableConnectionStatus;
}

export const selectOwnClientInfo = (state: TRootState) => {
    return state.clientInfo;
}

export const selectClientId = (state: TRootState) => {
    return state.clientInfo ? state.clientInfo.clientId : null;
}

export const selectTablePixelDimensions = (state: TRootState) => state.tablePixelDimensions;

export const selectGrabbedEntityInfo = (state: TRootState) => state.grabbedEntityInfo;

export const selectClientSeatId = (clientId: TMaybeNull<string>) => 
    (state: TRootState) => {
        const client = state.gameState.clients.find(({clientInfo}) => clientInfo.clientId === clientId );
        return client ? client.clientInfo.seatId : null;
    } 

export const selectHorizontalScalingRation = (state: TRootState) => state.horizontalScalingRatio;
export const selectVerticalScalingRation = (state: TRootState) => state.verticalScalingRatio;

export const selectIsMirrored = (state: TRootState) => state.isMirrored;