import React, { CSSProperties } from 'react'
import {selectGrabbedEntityByClientId, selectClientHandById, selectClientId } from '../../selectors';
import {Card} from '../entity'
import { useDispatch } from 'react-redux';
import { emitCardVerb } from '../../actions';
import { CardVerbTypes } from '../../types/verbTypes';
import config from '../../config/global';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import { useTypedSelector } from '../../store';

type Props = {
    belongsTo: string,
    upsideDown: boolean
}

const horizontalOffset = 30;
const verticalOffset = 80;

export function Hand({belongsTo}: Props) {

    const dispatch = useDispatch();
    const cards = useTypedSelector(selectClientHandById(belongsTo));
    const currentClientId = useTypedSelector(selectClientId);
    const grabbedEntity = useTypedSelector(selectGrabbedEntityByClientId(currentClientId));
    const renderedCards = flatten(
        chunk(cards, config.handRowSize)
        .map((row, rowIndex) => row.map((card, cardIndex) => {
                const {entityId, entityType, face, ownerDeck} = card;
                return <Card zIndex={cardIndex} grabbedBy={null} entityId={entityId} entityType={entityType} face={face} height={88} width={63} positionX={cardIndex * horizontalOffset + 10} positionY={rowIndex * verticalOffset + 30} scale={1} key={entityId}/>
            })
        )
    )

    const styles: {[key: string]: CSSProperties} = {
        hand: {
            position: 'relative',
            width: 200,
            height: 200,
            marginBottom: 30,
            background: 'purple',
            zIndex: 0
        },
    }

    
    return (
        <>
            <div className='hand' style={styles.hand}
            onMouseUp={
                ev => {
                    if(grabbedEntity && belongsTo === currentClientId && cards.length < config.maxHandSize){
                        ev.stopPropagation();
                        dispatch(emitCardVerb(ev.clientX, ev.clientY, CardVerbTypes.PUT_IN_HAND, grabbedEntity.entityId))
                    }
                }
            }>
                {renderedCards}
            </div>
        </>
    )
}