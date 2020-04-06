import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../store';
import {DisplayCardEntity, DeckEntity, ClientHand} from '../common/dataModelDefinitions'
import {Card} from './Card';
import {Deck} from './Deck'
import {emitSharedVerb, setTablePosition} from '../actions';
import { selectGrabbedEntityByClientId, selectHands } from '../selectors';
import { SharedVerbTypes } from '../common/verbTypes';
import { tableDimensions, playAreaDimensions } from '../config/visuals';

type Props = {
}

const tableElementId = 'TableElement'

export function Table({}: Props) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const tableElement = document.getElementById(tableElementId);
        if(tableElement){
            const leftOffset = Math.round(playAreaDimensions.width / 2 - tableDimensions.width / 2);
            const topOffset = Math.round(playAreaDimensions.height / 2 - tableDimensions.height / 2);
            dispatch(setTablePosition(leftOffset, topOffset));
        }

    }, [])


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
            width: tableDimensions.width,
            height: tableDimensions.height,
            backgroundColor: 'green',
        }}>
            {renderedCards}
            {renderedDecks}
            
        </div>
    )
}