import React, { CSSProperties } from 'react';
import { tableDimensions } from '../../config/visuals';
import { useTypedSelector } from '../../store';
import { selectCards, selectDecks, selectEntityScale, selectHorizontalScalingRatio, selectVerticalScalingRatio } from '../../selectors';
import { Deck } from '../entity'
import { Card } from '../entity';
import { mirrorOnTablePosition, downscale } from '../../utils/';
import config from '../../config/global';
import { Ratio } from '../../types/additionalTypes';

type Props = {
    width: number // pixel
    height: number // pixel
    upsideDown: boolean
}

export function Table({upsideDown, width, height}: Props){

    const cards = useTypedSelector(selectCards);
    const decks = useTypedSelector(selectDecks);
    const entityScale = useTypedSelector(selectEntityScale);
    const horizontalScalingRatio = useTypedSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useTypedSelector(selectVerticalScalingRatio);

    const cardEntities = cards.map(card => {
        let {positionX, positionY} = card;
        // console.log('original pos ', positionX, positionY);
        positionX = downscale(horizontalScalingRatio, positionX);
        positionY = downscale(verticalScalingRatio, positionY);
        // console.log('downscaled pos ', positionX, positionY);

        if(upsideDown){
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, width, height);
            // console.log('mirrored position', positionX, positionY)
        }
        return <Card key={card.entityId} positionX={positionX} positionY={positionY} scale={entityScale} upsideDown={upsideDown} entityType={card.entityType} height={card.height} entityId={card.entityId} face={card.face} grabbedBy={card.grabbedBy} width={card.width} zIndex={card.zIndex}/>
    })
    const deckEntities = decks.map(deck => {
        let {positionX, positionY} = deck;
        // console.log('original pos ', positionX, positionY);
        positionX = downscale(horizontalScalingRatio, positionX);
        positionY = downscale(verticalScalingRatio, positionY);
        // console.log('downscaled pos ', positionX, positionY);
        if(upsideDown){
            [positionX, positionY] =  mirrorOnTablePosition(positionX, positionY, width, height);
            // console.log('mirrored position', positionX, positionY)
            
        }
        return <Deck key={deck.entityId} entityId={deck.entityId} width={deck.width} height={deck.height} positionX={positionX} positionY={positionY} scale={entityScale} entityType={deck.entityType} grabbedBy={deck.grabbedBy} drawIndex={deck.drawIndex} size={deck.cards.length} zIndex={deck.zIndex} upsideDown={upsideDown} />
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