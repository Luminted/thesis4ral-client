import React, { CSSProperties } from 'react';
import { tableDimensions } from '../../config/visuals';
import { useTypedSelector } from '../../store';
import { selectCards, selectDecks } from '../../selectors';
import { Deck } from '../entity'
import { Card } from '../entity';
import { mirrorOnTablePosition } from '../../utils/';
import config from '../../config/global';

type Props = {
    upsideDown: boolean
}

export function Table({upsideDown}: Props){

    const cards = useTypedSelector(selectCards);
    const decks = useTypedSelector(selectDecks);
    const cardEntities = cards.map(card => {
        let {positionX, positionY} = card;
        if(upsideDown){
            const {tableHeight, tableWidth} = config;
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
            console.log('card position', positionX, positionY)
        }
        return <Card {...card} positionX={positionX} positionY={positionY} key={card.entityId} upsideDown={upsideDown}/>
    })
    const deckEntities = decks.map(deck => {
        const {entityId, width, height, scale, entityType, grabbedBy, drawIndex, cards, zIndex} = deck;
        let {positionX, positionY} = deck;
        if(upsideDown){
            const {tableHeight, tableWidth} = config;
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
            console.log('deck position', positionX, positionY)
            
        }
        return <Deck key={entityId} entityId={entityId} width={width} height={height} positionX={positionX} positionY={positionY} scale={scale} entityType={entityType} grabbedBy={grabbedBy} drawIndex={drawIndex} size={cards.length} zIndex={zIndex} upsideDown={upsideDown} />
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
            {cardEntities}
            {deckEntities}
        </div>
    )
}