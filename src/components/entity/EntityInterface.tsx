import React, { ReactChild, CSSProperties, useEffect} from 'react';
import { GrabbedEntity, EntityTypes } from '../../types/dataModelDefinitions';
import { useDispatch } from 'react-redux';
import { emitDerivedVerb, emitSharedVerb, setGrabbedEntityOriginalPosition } from '../../actions';
import { selectGrabbedEntityOfCurrentClient } from '../../selectors';
import { VerbContextTypes } from '../../types/additionalTypes';
import { MaybeNull } from '../../types/genericTypes';
import { SharedVerbTypes } from '../../types/verbTypes';
import { ListenedMouseEventTypes } from '../../controller/types';
import { useTypedSelector } from '../../store';

type Props = {
    children?: ReactChild,
    verbContext?: MaybeNull<VerbContextTypes> 
    positionX: number,
    positionY: number,
    entityType: EntityTypes,
    entityId: string,
    grabbedBy: MaybeNull<string>,
    zIndex: number
}

export function EntityInterface({children, entityId, entityType, positionX, positionY, zIndex, verbContext = null}: Props){

    const dispatch = useDispatch();
    const grabbedEntity = useTypedSelector<MaybeNull<GrabbedEntity>>(selectGrabbedEntityOfCurrentClient);
    const eventPassthrough = grabbedEntity?.entityId === entityId;

    function documentOnMouseMoveHandler(ev: MouseEvent) {
        // console.log('mousemove')
        if(grabbedEntity && grabbedEntity.entityId === entityId){
            dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.MOVE, entityId, entityType));
        }
    }

    function documentOnMouseUpHandler(ev: MouseEvent) {
        console.log(ev.clientX, ev.clientY);
        // console.log('mouseup')

        if(grabbedEntity && grabbedEntity.entityId === entityId) {
            dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.RELEASE, entityId, entityType));
        }
    }

    useEffect(() => {
        document.addEventListener(ListenedMouseEventTypes.MOUSE_MOVE, documentOnMouseMoveHandler);
        document.addEventListener(ListenedMouseEventTypes.MOUSE_UP, documentOnMouseUpHandler);

        return () => {
            document.removeEventListener(ListenedMouseEventTypes.MOUSE_MOVE, documentOnMouseMoveHandler);
            document.removeEventListener(ListenedMouseEventTypes.MOUSE_UP, documentOnMouseUpHandler);
        }
    })

    const styles: {[key: string]: CSSProperties} = {
        entityInterface: {
            position: 'absolute',
            left: positionX,
            top: positionY,
            pointerEvents: eventPassthrough ? 'none' : 'auto',
            zIndex: zIndex
        }
    }

    return (
        <div  className='entity-interface'
                draggable
                style={styles.entityInterface}
            onMouseUp={ev => {
                if(!!grabbedEntity === false){
                    ev.stopPropagation();
                    dispatch(emitDerivedVerb(ev, entityId, entityType, verbContext));
                }
            }}
            onMouseDown={ev => {
                if(!!grabbedEntity === false){
                    ev.stopPropagation();
                    dispatch(emitDerivedVerb(ev, entityId, entityType, verbContext));
                }
            }}
            onDragStart={
                ev => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    dispatch(setGrabbedEntityOriginalPosition({
                        x: positionX,
                        y: positionY
                    }))
                    dispatch(emitDerivedVerb(ev, entityId, entityType, verbContext));
                }
            }
        >
            {children}
        </div>
    )
}