import React, { useState, CSSProperties, SyntheticEvent } from 'react';
import {useDispatch} from 'react-redux';

import {emitDerivedVerb} from '../actions';
import {DisplayCardEntity, GrabbedEntity} from '../common/dataModelDefinitions';
import { useTypedSelector } from '../store';
import { selectGrabbedEntityByClientId, selectClientId } from '../selectors';

const cardDim = {
    x: 63,
    y: 88
}

type Props = DisplayCardEntity;

export function Card({face, height = cardDim.y ,width = cardDim.x, scale = 1, positionX, positionY, entityId, entityType}:Props) {
    const dispatch = useDispatch();
    const clientId = useTypedSelector<string>(selectClientId);
    const grabbedEntity = useTypedSelector<GrabbedEntity>(selectGrabbedEntityByClientId(clientId));
    const isGrabbed = grabbedEntity && grabbedEntity.entityId === entityId;

    const style: CSSProperties = {
        pointerEvents: isGrabbed ? 'none' : 'all'
    }

    return (
        <div 
            onMouseDown={
                (ev) => {
                    ev.stopPropagation()
                    console.log(ev)
                    dispatch(emitDerivedVerb(ev, entityId, entityType));
                }
            }
            onDragStart = {
                ev => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dispatch(emitDerivedVerb(ev, entityId, entityType));
                }
            }
            style={{
                ...style,
                position: 'absolute',
                left: positionX,
                top: positionY,
                backgroundColor: 'blue',
                width: width * scale,
                height: height * scale,
                zIndex: 2
        }} draggable>
            {face}
        </div>
    )
}