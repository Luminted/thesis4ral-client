import * as React from 'react';
import {useDispatch} from 'react-redux';

import {emitVerb} from '../actions';
import {CardDataModel} from '../common/dataModelDefinitions';
import {useTypedSelector} from '../store';

const cardDim = {
    x: 63,
    y: 88
}

type Props = CardDataModel;

export function Card({height = cardDim.y ,width = cardDim.x, scale = 1, positionX, positionY, entityId, entityType}:Props) {
    const dispatch = useDispatch();

    return (
        <div  
            onMouseDown={
                (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                        dispatch(emitVerb(ev, entityId, entityType));
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
            Card
        </div>
    )
}