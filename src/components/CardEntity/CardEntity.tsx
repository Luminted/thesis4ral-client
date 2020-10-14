import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb, emitGrabVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import {Props, ECardInteractionContext } from "./typings";
import {style} from "./style";
import { selectCardById, selectGrabbedEntity } from "../../selectors";
import { emitRotateVerb } from "../../actions/thunks/emitSharedVerb/emitRotateVerb";
import {cardRotationStepDegree} from "../../config";

export const CardEntity = ({entityId, context, positionX, positionY, faceUp, zIndex, rotation = 0 }: Props) => {

    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onDragStartOnTable = (e: DragEvent) => {
        e.preventDefault();
        console.log('dragStarted')
        dispatch(emitGrabVerb(entityId, EntityTypes.CARD, e.clientX, e.clientY));
    }

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId, EntityTypes.CARD, cardRotationStepDegree));
    }

    const onClick = () => {
        dispatch(emitFlipVerb(entityId));
    }

    return (
        <>
        <div draggable={true} className="card-entity" style={{
            left: positionX,
            top: positionY,
            pointerEvents: isGrabbed ? "none" : "auto",
            rotate: `${rotation}deg`,
            zIndex: zIndex || "auto"
        }}
        onDragStart={context === ECardInteractionContext.TABLE ? onDragStartOnTable : undefined}
        onClick={onClick}
        onContextMenu={onRightClick}>
            <div style={{
                width: 56,
                height: 88,
                background: faceUp ? "lightblue" : "blue"
            }}></div>
        </div>
            <style jsx={true}>{style}</style>
        </>
    )
}