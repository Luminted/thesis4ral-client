import React, { ReactChild, CSSProperties, useEffect} from 'react';
import { BaseEntity, GrabbedEntity } from '../../../types/dataModelDefinitions';
import { useDispatch, useSelector } from 'react-redux';
import { emitDerivedVerb, emitSharedVerb, setGrabbedEntityOriginalPosition } from '../../../actions';
import { useTypedSelector } from '../../../store';
import { selectGrabbrdEntityOfCurrentClient, selectTablePosition, selectTableBoundaries, selectPlayareaBoundaries, selectGrabbedEntityOriginalPosition } from '../../../selectors';
import { VerbContextTypes } from '../../../types/additionalTypes';
import { MaybeNull } from '../../../types/genericTypes';
import globalConfig from '../../../config/global';
import { SharedVerbTypes } from '../../../types/verbTypes';
import { ListenedMouseEventTypes } from '../../../controller/types';

interface Props extends BaseEntity {
    children?: ReactChild,
    verbContext?: MaybeNull<VerbContextTypes> 
    boundTo?: 'table' | 'playarea'

}

export function EntityInterface({children, boundTo, entityId, entityType, height, positionX, positionY, scale, width, verbContext = null}: Props){

    const dispatch = useDispatch();
    const grabbedEntity = useTypedSelector<GrabbedEntity>(selectGrabbrdEntityOfCurrentClient);
    const tablePosition = useSelector(selectTablePosition);
    const eventPassthrough = grabbedEntity?.entityId === entityId;
    const tableBoundaries = useSelector(selectTableBoundaries);
    const playareaBoundaries = useSelector(selectPlayareaBoundaries);
    const grabbedEntityOriginalPosition = useSelector(selectGrabbedEntityOriginalPosition);

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
            height: height * scale,
            width: width * scale,
            pointerEvents: eventPassthrough ? 'none' : 'auto'
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