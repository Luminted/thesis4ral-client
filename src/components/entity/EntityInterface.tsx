import React, { ReactChild, CSSProperties, useEffect} from 'react';
import { GrabbedEntity, EntityTypes } from '../../types/dataModelDefinitions';
import { useDispatch } from 'react-redux';
import { emitDerivedVerb, emitSharedVerb } from '../../actions';
import { selectGrabbedEntityOfCurrentClient, selectHorizontalScalingRatio, selectVerticalScalingRatio } from '../../selectors';
import { VerbContextTypes } from '../../types/additionalTypes';
import { MaybeNull } from '../../types/genericTypes';
import { SharedVerbTypes } from '../../types/verbTypes';
import { ListenedMouseEventTypes } from '../../controller/types';
import { useTypedSelector } from '../../store';
import { downscale } from '../../utils';

type Props = {
    children?: ReactChild,
    verbContext?: MaybeNull<VerbContextTypes> 
    positionX: number,
    positionY: number,
    entityType: EntityTypes,
    entityId: string,
    grabbedBy: MaybeNull<string>,
    zIndex: number,
    upsideDown: boolean
}

export function EntityInterface({children, entityId, entityType, positionX, positionY, zIndex, verbContext = null, upsideDown}: Props){

    const dispatch = useDispatch();
    const grabbedEntity = useTypedSelector(selectGrabbedEntityOfCurrentClient);
    const horizontalScalingRatio = useTypedSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useTypedSelector(selectVerticalScalingRatio);
    const eventPassthrough = grabbedEntity?.entityId === entityId;

    function documentOnMouseMoveHandler(ev: MouseEvent) {
        // console.log('move verb')
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

    if(grabbedEntity?.entityId === entityId){
        console.log('downscaled position', positionX, downscale(horizontalScalingRatio, positionX))
    }
    const styles: {[key: string]: CSSProperties} = {
        entityInterface: {
            position: 'absolute',
            left: downscale(horizontalScalingRatio, positionX),
            top: downscale(verticalScalingRatio, positionY),
            pointerEvents: eventPassthrough ? 'none' : 'auto',
            transform: upsideDown ? 'rotate(180deg)' : undefined,
            transformOrigin: '0% 0%',
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
                    dispatch(emitDerivedVerb(ev, entityId, entityType, verbContext));
                }
            }
        >
            {children}
        </div>
    )
}