import React from 'react';
import {useDispatch} from 'react-redux';

import {emitDerivedVerb} from '../actions';
import {CardEntity} from '../common/dataModelDefinitions';
import {useTypedSelector} from '../store';

const cardDim = {
    x: 63,
    y: 88
}

type Props = CardEntity;

export function Card({face, height = cardDim.y ,width = cardDim.x, scale = 1, positionX, positionY, entityId, entityType}:Props) {
    const dispatch = useDispatch();

    return (
        <div style={{
            display: 'flex',
        }}>
        <div  
            onMouseDown={
                (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dispatch(emitDerivedVerb(ev, entityId, entityType));
                }
            }
            style={{
                position: 'absolute',
                left: positionX,
                top: positionY,
                backgroundColor: 'blue',
                width: width * scale,
                height: height * scale
        }}>
            {face}
        </div>

        </div>
    )
}