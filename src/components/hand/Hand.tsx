import React, { CSSProperties } from 'react'
import { CardRepresentation, GrabbedEntity, EntityTypes } from '../../types/dataModelDefinitions';
import { selectClientHandCardsById, selectClientId, selectGrabbedEntityByClientId } from '../../selectors';
import {Card} from '../entity'
import { useDispatch } from 'react-redux';
import { emitCardVerb } from '../../actions';
import { CardVerbTypes } from '../../types/verbTypes';
import { MaybeNull } from '../../types/genericTypes';
import config from '../../config/global';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import { useTypedSelector } from '../../store';

type Props = {
    ownerId?: MaybeNull<string>,
}

const horizontalOffset = 30;
const verticalOffset = 80;

export function Hand({ownerId = null}: Props) {

    const dispatch = useDispatch();
    const cards = useTypedSelector(selectClientHandCardsById(ownerId));
    const clientId = useTypedSelector(selectClientId);
    const grabbedEntity = useTypedSelector(selectGrabbedEntityByClientId(clientId));
    const renderedCards = flatten(
        chunk(cards, config.handRowSize)
        .map((row, rowIndex) => row.map((card, cardIndex) => {
                const {entityId, entityType, face, ownerDeck} = card;
                return <Card zIndex={cardIndex} grabbedBy={clientId} entityId={entityId} entityType={entityType} face={face} height={88} width={63} positionX={cardIndex * horizontalOffset + 10} positionY={rowIndex * verticalOffset + 30} scale={1} key={entityId}/>
            })
        )
    )

    if(cards.length){
        console.log(renderedCards)
    }

    const styles: {[key: string]: CSSProperties} = {
        hand: {
            position: 'relative',
            width: 200,
            height: 200,
            marginBottom: 30,
            background: ownerId === clientId ? 'purple' : 'cyan',
            zIndex: 0
        },
        handPlaceholder: {
            width: 200,
            height: 200,
            background: 'lightcyan',
            zIndex: 0
        }
    }

    
    return (
        <>
            {ownerId ? (
                <div className='hand' style={styles.hand}
                onMouseUp={
                    ev => {
                        if(grabbedEntity && ownerId === clientId && cards.length < config.maxHandSize){
                            ev.stopPropagation();
                            dispatch(emitCardVerb(ev.clientX, ev.clientY, CardVerbTypes.PUT_IN_HAND, grabbedEntity.entityId))
                        }
                    }
                }>
                    {renderedCards}
                </div>
            ) :
            <div className='hand-placeholder' style={styles.handPlaceholder}></div>}
        </>
    )
}