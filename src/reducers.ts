import {AnyAction} from 'redux';
import {SYNC, SyncActionPayload} from './actions';
import {CardDataModel} from './dataModelTypedefinitions'

const initialState = {
    cards: [
    {
        positionX: 0,
        positionY: 0,
    },
    {
        positionX: 100,
        positionY: 0,
    },
    {
        positionX: 0,
        positionY: 100,
    }
    ] as CardDataModel[]
}

export function cards(state = initialState.cards, action: AnyAction) {
    switch(action.type){
        case SYNC: 
            const payload : SyncActionPayload = action.payload;
            return payload.cards;
        default:
            return state;
    }
} 