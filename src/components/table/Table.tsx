import React, { CSSProperties, useEffect } from 'react';
import { tableDimensions } from '../../config/visuals';
import { useTypedSelector } from '../../store';
import { CardEntity, DeckEntity } from '../../types/dataModelDefinitions';
import { selectCards, selectDecks } from '../../selectors';
import { Deck } from '../entity'
import { Card } from '../entity';

export function Table(){

    const cards = useTypedSelector<CardEntity[]>(selectCards);
    const decks = useTypedSelector<DeckEntity[]>(selectDecks);
    const cardComponents = cards.map(card => {
        return <Card {...card} key={card.entityId} />
    })
    const deckComponents = decks.map(deck => {
        const {entityId, width, height, positionX, positionY, scale, entityType, grabbedBy, drawIndex, cards, zIndex} = deck;
        return <Deck entityId={entityId} width={width} height={height} positionX={positionX} positionY={positionY} scale={scale} entityType={entityType} grabbedBy={grabbedBy} drawIndex={drawIndex} size={cards.length} zIndex={zIndex}/>
    })


    const styles:{[key: string]: CSSProperties} = {
        table:{
            position: 'relative',
            height: tableDimensions.height,
            width: tableDimensions.width,
            backgroundColor: 'green'
        }
    }

    return (
        <div className='table' style={styles.table}>
            {cardComponents}
            {deckComponents}
        </div>
    )
}