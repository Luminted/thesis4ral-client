import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { emitCardVerb } from '../../actions';
import { CardVerbTypes } from '../../common/verbTypes';
import { useTypedSelector } from '../../store';
import { GrabbedEntity, BaseCard, ClientHand } from '../../common/dataModelDefinitions';
import { selectGrabbedEntityByClientId, selectClientId, selectClientHandCardsById } from '../../selectors';
import { handDimensions } from '../../config/visuals';
import {HandCard} from './HandCard'

type Props = {
    belongsTo: string
}

const horizontalOffset = 20;

export function Hand({belongsTo}: Props) {
    const dispatch = useDispatch();

    const clientId = useTypedSelector<string>(selectClientId);
    const grabbedEntity = useTypedSelector<GrabbedEntity>(selectGrabbedEntityByClientId(clientId));
    const cards = useTypedSelector<BaseCard[]>(selectClientHandCardsById(belongsTo));
    const renderedCards = cards.map((card, index) => {
        const {entityId, face, faceUp, } = card;
        return <HandCard key={entityId} entityId={entityId} face={face} isFacingUp={faceUp} positionX={index * horizontalOffset} positionY={20}/>
    })
        

    return <div className='hand' style={{
        position: 'relative',
        ...handDimensions
    }} 
    onMouseUp={
        ev => {
            console.log('HAND MOUSE UP')
            if(belongsTo === clientId){
                if(grabbedEntity){
                    dispatch(emitCardVerb(ev.clientX, ev.clientY, CardVerbTypes.PUT_IN_HAND, grabbedEntity.entityId))
                }
            }
        }
    }>
        {renderedCards}
    </div>
}