import React, { ReactChildren, useDebugValue, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import { selectGrabbedEntityOfCurrentClient, selectClientId } from '../../selectors';
import { Entity, Seats, EntityTypes } from '../../types/dataModelDefinitions';
import { setGameState, emitSharedVerb } from '../../actions';
import { ListenedMouseEventTypes } from '../../controller/types';
import { SharedVerbTypes } from '../../types/verbTypes';

type Props = {
    children: ReactNode
}

export function InteractionGutter({children}: Props){

    const dispatch = useDispatch();
    const grabbedEntity = useTypedSelector(selectGrabbedEntityOfCurrentClient);

    function onMouseMoveHandler(ev) {
        // console.log('move verb')
        if(grabbedEntity){
            dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.MOVE, grabbedEntity.entityId, grabbedEntity.entityType));
        }
    }

    function onMouseUpHandler(ev) {
        console.log(ev.clientX, ev.clientY);
        // console.log('mouseup')

        if(grabbedEntity) {
        console.log('global releasing')
        console.log('gutter')
            dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.RELEASE, grabbedEntity.entityId, grabbedEntity.entityType));
        }
    }

    return(
        <div onMouseUp={onMouseUpHandler} onMouseMove={onMouseMoveHandler}>
            {children}
        </div>
    )

}