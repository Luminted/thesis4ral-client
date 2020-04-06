import React from 'react';
import { BaseCard } from '../../common/dataModelDefinitions';
import { useDispatch } from 'react-redux';
import { emitCardVerb, connectToSocket } from '../../actions';
import { CardVerbTypes } from '../../common/verbTypes';
import { useTypedSelector } from '../../store';
import { selectTablePosition } from '../../selectors';

type Props = {
    positionX: number,
    positionY: number
    entityId: string,
    face: string,
    isFacingUp: boolean
}

const cardDim = {
    x: 63,
    y: 88
}


export function HandCard({entityId, face, isFacingUp, positionX, positionY}: Props) {
    const dipatch = useDispatch();

    const tablePosition = useTypedSelector<{x: number, y:number}>(selectTablePosition);

    return (
        <div draggable
        style={{
            position: 'absolute',
            top: positionY,
            left: positionX,
            width: cardDim.x,
            height: cardDim.y,
            backgroundColor: 'blue',
            border: 'solid black 1px'
        }}
        onDragStart={ev => {
            console.log(ev.clientX, ev.clientY)
            console.log('normed values', )
            ev.preventDefault();
            ev.stopPropagation();
            dipatch(emitCardVerb(ev.clientX - tablePosition.x, ev.clientY - tablePosition.y, CardVerbTypes.GRAB_FROM_HAND, entityId));
        }}>{face}</div>
    )
}