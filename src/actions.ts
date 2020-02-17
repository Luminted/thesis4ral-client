import {CardDataModel} from './dataModelTypedefinitions'

export type SyncActionPayload = {
    cards: CardDataModel[]
}

export const SYNC = 'SYNC'

export function sync(gameState: SyncActionPayload) {
    return {
        type: SYNC,
        payload: gameState
    }
}