import React from 'react';
import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../store';
import {CardEntity, DeckEntity} from '../common/dataModelDefinitions'
import {Card} from './Card';
import {Deck} from './Deck'
import {emitDerivedVerb, emitSharedVerb} from '../actions';
import { selectGrabbedEntityByClientId } from '../selectors';
import { SharedVerbTypes } from '../common/verbTypes';

type Props = {
    width: number,
    height: number,
}

const tableElementId = 'TableElement'

export function Table({width, height}: Props) {

    const dispatch = useDispatch();

    const cards = useTypedSelector<CardEntity[]>((store) => store.gameState.cards);
    const decks = useTypedSelector<DeckEntity[]>((store) => store.gameState.decks);
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
        onMouseMove={
            ev => {
                ev.preventDefault();
                if(grabbedEntity){
                    const {entityId, entityType} = grabbedEntity;
                    dispatch(emitDerivedVerb(ev, entityId, entityType));
                }
            }
        }
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
            backgroundColor: 'green'
        }}>
            {renderedCards}
            {renderedDecks}
        </div>
    )
}