import React from 'react';

import {Table} from '../Table'
import { useDispatch, useSelector } from 'react-redux';
import { selectGrabbrdEntityOfCurrentClient } from '../../selectors';
import { emitDerivedVerb } from '../../actions';

export function PlayArea(){

    const dispatch = useDispatch();
    const grabbedEntity = useSelector(selectGrabbrdEntityOfCurrentClient);

    return (
    <div style={{
        position: 'relative',
        width:'100%',
        height: '100vh',
        backgroundColor: 'silver'
    }}
    onMouseMove={
        ev => {
            ev.preventDefault();
            if(grabbedEntity){
                const {entityId, entityType} = grabbedEntity;
                dispatch(emitDerivedVerb(ev, entityId, entityType));
            }
        }
    }>
        <Table height={540} width={910} positionX={150} positionY={100}/>
    </div>
    )
}