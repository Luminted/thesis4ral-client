import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { emitCardVerb } from '../../actions';
import { CardVerbTypes } from '../../common/verbTypes';
import { useTypedSelector } from '../../store';
import { GrabbedEntity } from '../../common/dataModelDefinitions';
import { selectGrabbedEntityByClientId, selectClientId } from '../../selectors';

type Props = {
    width: number,
    height: number,
    positionX: number,
    positionY: number
}

export function Hand({height, width,positionX,positionY}: Props) {
    const dispatch = useDispatch();

    const clientId = useTypedSelector<string>(selectClientId);
    const grabbedEntity = useTypedSelector<GrabbedEntity>(selectGrabbedEntityByClientId(clientId));

    return <div className='hand' style={{
        position: 'absolute',
        width,
        height,
        left: positionX,
        top: positionY,
        zIndex: 0
    }} 
    onMouseUp={
        ev => {
            console.log('HAND MOUSE UP')
            if(grabbedEntity){
                dispatch(emitCardVerb(ev.clientX, ev.clientY, CardVerbTypes.PUT_IN_HAND, grabbedEntity.entityId))
            }
        }
    }></div>
}