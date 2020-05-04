import React, { CSSProperties, useEffect } from 'react';
import { tableDimensions } from '../../../config/visuals';
import { useTypedSelector } from '../../../store';
import { DisplayCardEntity, DeckEntity } from '../../../types/dataModelDefinitions';
import { selectCards, selectDecks } from '../../../selectors';
import { Deck } from './Deck';
import { Card } from '../card';

export function Table(){

    const cards = useTypedSelector<DisplayCardEntity[]>(selectCards);
    const decks = useTypedSelector<DeckEntity[]>(selectDecks);
    const cardComponents = cards.map(card => {
        const {entityId, entityType, faceUp, face, height, width, scale, positionX, positionY} = card;
        return <Card entityId={entityId} entityType={entityType} face={face} height={height} width={width} scale={scale} positionX={positionX} positionY={positionY} key={entityId}/>
    })
    const deckComponents = decks.map(deck => {
        const {entityId, width, height, positionX, positionY, scale, entityType} = deck;
        return <Deck entityId={entityId} entityType={entityType} key={entityId} positionX={positionX} positionY={positionY} height={height} width={width} scale={scale} />
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