import React from 'react';
import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../store';
import {DisplayCardEntity, DeckEntity, ClientHand} from '../common/dataModelDefinitions'
import {Card} from './Card';
import {Deck} from './Deck'
import {emitSharedVerb} from '../actions';
import { selectGrabbedEntityByClientId, selectHands } from '../selectors';
import { SharedVerbTypes } from '../common/verbTypes';
import {Hand} from './hand/Hand'

type Props = {
    width: number,
    height: number,
    positionX: number,
    positionY: number
}

const tableElementId = 'TableElement'

export function Table({width, height, positionX, positionY}: Props) {

    const dispatch = useDispatch();

    const cards = useTypedSelector<DisplayCardEntity[]>((store) => store.gameState.cards);
    const decks = useTypedSelector<DeckEntity[]>((store) => store.gameState.decks);
    const hands = useTypedSelector<ClientHand[]>(selectHands);
    const clientId = useTypedSelector(store => store.clientInfo.clientId);
    const grabbedEntity = useTypedSelector(selectGrabbedEntityByClientId(clientId));

    const renderedCards = cards.map((card) => {
        const {entityId} = card;
        return <Card key={entityId} {...card} />
    });

    const renderedDecks = decks.map(deck => {
        const {entityId} = deck;
        return <Deck key={entityId} {...deck} />
    })

    const renderedHands = hands.map(hand => {
        const {clientId} = hand;
        return <Hand key={clientId} positionX={150} positionY={500} height={250} width={200}/>
    })



    // TODO: DESTRUCT EVENT LISTENERS
    
    return (
        <div id={tableElementId}
        onMouseUp={
            ev => {
                ev.preventDefault();
                if(grabbedEntity){
                    const {entityId, entityType} = grabbedEntity;
                    dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.RELEASE, entityId, entityType));
                }
            }
        }
        onContextMenu={ev => ev.preventDefault()}
        style={{
            position: 'relative',
            width,
            height,
            left: positionX,
            top: positionY,
            backgroundColor: 'green'
        }}>
            {renderedCards}
            {renderedDecks}
            {renderedHands}
            
        </div>
    )
}