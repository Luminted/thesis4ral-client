import React, { CSSProperties } from 'react';
import { tableDimensions } from '../../config/visuals';
import { useTypedSelector } from '../../store';
import { selectCards, selectDecks, selectEntityScale } from '../../selectors';
import { Deck } from '../entity'
import { Card } from '../entity';
import { mirrorOnTablePosition } from '../../utils/';
import config from '../../config/global';

type Props = {
    width: number // pixel
    height: number // pixel
    upsideDown: boolean
}

export function Table({upsideDown, width, height}: Props){

    const cards = useTypedSelector(selectCards);
    const decks = useTypedSelector(selectDecks);
    const entityScale = useTypedSelector(selectEntityScale);

    const cardEntities = cards.map(card => {
        let {positionX, positionY} = card;
        if(upsideDown){
            const {tableHeight, tableWidth} = config;
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
            console.log('card position', positionX, positionY)
        }
        return <Card {...card} positionX={positionX} positionY={positionY} scale={entityScale} key={card.entityId} upsideDown={upsideDown}/>
    })
    const deckEntities = decks.map(deck => {
        const {entityId, width, height, entityType, grabbedBy, drawIndex, cards, zIndex} = deck;
        let {positionX, positionY} = deck;
        if(upsideDown){
            const {tableHeight, tableWidth} = config;
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
            console.log('deck position', positionX, positionY)
            
        }
        return <Deck key={entityId} entityId={entityId} width={width} height={height} positionX={positionX} positionY={positionY} scale={entityScale} entityType={entityType} grabbedBy={grabbedBy} drawIndex={drawIndex} size={cards.length} zIndex={zIndex} upsideDown={upsideDown} />
    })


    const styles:{[key: string]: CSSProperties} = {
        table:{
            width,
            height,
            position: 'relative',
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