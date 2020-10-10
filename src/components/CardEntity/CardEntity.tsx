import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitCardVerb, emitSharedVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { CardVerbTypes, SharedVerbTypes } from "../../types/verbTypes";
import {Props, CardInteractionContext } from "./typings";
import {style} from "./style";
import { selectCardById, selectGrabbedEntity } from "../../selectors";
import { emitRotateVerb } from "../../actions/thunks/emitRotateVerb";
import {cardRotationStepDegree} from "../../config";

export const CardEntity = ({entityId, context, scale = 1}: Props) => {

    const dispatch = useDispatch();

    const cardEntityDetails = useSelector(selectCardById(entityId));
    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onDragStartOnTable = (e: DragEvent) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        console.log('dragStarted')
        dispatch(emitSharedVerb(clientX, clientY, SharedVerbTypes.GRAB, entityId, EntityTypes.CARD));
    }

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        dispatch(emitRotateVerb(clientX, clientY, entityId, EntityTypes.CARD, cardRotationStepDegree))
    }

    const onClick = (e: MouseEvent) => {
        const {clientX, clientY} = e;
        dispatch(emitCardVerb(clientX, clientY, CardVerbTypes.FLIP, entityId))
    }

    return (
        <>
        {cardEntityDetails && <div draggable={true} className="card-entity" style={{
            left: cardEntityDetails.positionX,
            top: cardEntityDetails.positionY,
            pointerEvents: isGrabbed ? "none" : "auto",
            rotate: `${cardEntityDetails.rotation % 360}deg`,
            zIndex: cardEntityDetails.zIndex
        }}
        onDragStart={context === CardInteractionContext.TABLE ? onDragStartOnTable : undefined}
        onClick={onClick}
        onContextMenu={onRightClick}>
            <div style={{
                width: 56,
                height: 88,
                background: cardEntityDetails.faceUp ? "lightblue" : "blue"
            }}></div>
        </div>}
            <style jsx={true}>{style}</style>
        </>
    )
}