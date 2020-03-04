import * as React from 'react';
import {useDispatch} from 'react-redux';

import {emitMouseInput} from '../actions';
import {EntityTypes} from '../common/dataModelDefinitions';
import {useTypedSelector} from '../store';

const cardDim = {
    x: 63,
    y: 88
}

type Props = {
    entityId: string,
    width?: number,
    height?: number,
    positionX: number,
    positionY: number,
    scale?: number
}

export function Card({height = cardDim.y ,width = cardDim.x, scale = 1, positionX, positionY, entityId}:Props) {
    const dispatch = useDispatch();
    const entityTypeRef = React.useRef(EntityTypes.CARD);

    const clientId = useTypedSelector(state => state.clientInfo?.clientId)

    return (
        <div  
            onMouseDown={
                (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    if(clientId){
                        dispatch(emitMouseInput(ev, clientId, entityId, entityTypeRef.current));
                    }
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