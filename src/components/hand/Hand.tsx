import React, { CSSProperties } from 'react'
import {selectGrabbedEntityByClientId, selectClientHandById, selectClientId, selectEntityScale } from '../../selectors';
import {Card} from '../entity'
import { useDispatch } from 'react-redux';
import { emitCardVerb } from '../../actions';
import { CardVerbTypes } from '../../types/verbTypes';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import { useTypedSelector } from '../../store';

type Props = {
    belongsTo: string,
    upsideDown: boolean
}

const config = {
    maxHandSize: 25,
    handRowSize: 25,
    height: 70 //percentage
}

const horizontalOffset = 30;
const verticalOffset = 80;

export function Hand({belongsTo}: Props) {

    const dispatch = useDispatch();
    const cards = useTypedSelector(selectClientHandById(belongsTo));
    const currentClientId = useTypedSelector(selectClientId);
    const grabbedEntity = useTypedSelector(selectGrabbedEntityByClientId(currentClientId));
    const entityScale = useTypedSelector(selectEntityScale);

    const renderedCards = flatten(
        chunk(cards, config.handRowSize)
        .map((row, rowIndex) => row.map((card, cardIndex) => {
                const {entityId, entityType, face, ownerDeck} = card;
                return <Card key={entityId} inHand={true} zIndex={cardIndex} grabbedBy={null} entityId={entityId} entityType={entityType} face={face} height={88} width={63} positionX={cardIndex * horizontalOffset + 10} positionY={0} scale={entityScale}/>
            })
        )
    )

    const styles: {[key: string]: CSSProperties} = {
        hand: {
            position: 'relative',
            width: '100%',
            height: `${config.height}%`,
            background: 'cyan',
        },
    }

    
    return (
        <>
            <div className='hand' style={styles.hand}
            onMouseUp={
                ev => {
                    console.log('hand')
                    ev.bubbles = false
                    ev.stopPropagation();
                    if(grabbedEntity && belongsTo === currentClientId && cards.length < config.maxHandSize){
                        dispatch(emitCardVerb(ev.clientX, ev.clientY, CardVerbTypes.PUT_IN_HAND, grabbedEntity.entityId))
                    }
                }
            }>
                {renderedCards}
            </div>
        </>
    )
}