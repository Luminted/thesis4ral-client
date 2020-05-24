import React, { ReactChildren, useDebugValue, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import { selectGrabbedEntityOfCurrentClient, selectClientId } from '../../selectors';
import { Entity, Seats, EntityTypes } from '../../types/dataModelDefinitions';
import { setGameState } from '../../actions';

type Props = {
    children: ReactNode
}

export function InteractionGutter({children}: Props){

    const dispatch = useDispatch();
    const grabbedEntity = useTypedSelector(selectGrabbedEntityOfCurrentClient);


    return(
        <div>
            {children}
        </div>
    )

    // const dispatch = useDispatch();
    // const grabbedEntity = useTypedSelector(selectGrabbedEntityOfCurrentClient);
    // const currentClientEntityId = useTypedSelector(selectClientId);
    
    // function createDocumentOnMouseMoveHandler() {

    //     return (ev: MouseEvent) => {
    //             dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.MOVE, entityId, entityType));
    //     }
    // }
    
    // function documentOnMouseUpHandler(ev: MouseEvent) {
    //     console.log(ev.clientX, ev.clientY);
    //     // console.log('mouseup')
    
    //     if(grabbedEntity && grabbedEntity.entityId === entityId) {
    //         dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.RELEASE, entityId, entityType));
    //     }
    // }
    
    // useEffect(() => {
    //     document.addEventListener(ListenedMouseEventTypes.MOUSE_MOVE, documentOnMouseMoveHandler);
    //     document.addEventListener(ListenedMouseEventTypes.MOUSE_UP, documentOnMouseUpHandler);
    
    //     return () => {
    //         document.removeEventListener(ListenedMouseEventTypes.MOUSE_MOVE, documentOnMouseMoveHandler);
    //         document.removeEventListener(ListenedMouseEventTypes.MOUSE_UP, documentOnMouseUpHandler);
    //     }
    // })
}