import React, { DragEvent, MouseEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb, emitGrabFromHand, emitGrabVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import {IProps, ECardInteractionContext } from "./typings";
import {style} from "./style";
import { selectGrabbedEntity } from "../../selectors";
import { emitRotateVerb } from "../../actions/thunks/emitSharedVerb/emitRotateVerb";
import {cardRotationStepDegree} from "../../config";

export const CardEntity = ({entityId, context, positionX, positionY, faceUp, zIndex, inHandOf, rotation = 0 }: IProps) => {

    const dispatch = useDispatch();

    const cardRef = useRef<HTMLDivElement>(null);

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onDragStartOnTable = (e: DragEvent) => {
        e.preventDefault();
        dispatch(emitGrabVerb(entityId, EntityTypes.CARD, e.clientX, e.clientY));
    }

    const onDragStartInHand = (e: DragEvent) => {
        e.preventDefault();
        const cardElement = cardRef.current;
        if(cardElement && inHandOf){
            const {left, top} = cardElement.getBoundingClientRect();
            const {clientX, clientY} = e;

            dispatch(emitGrabFromHand(entityId,clientX, clientY, inHandOf, left, top ))
        }
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
        <div draggable={true} ref={cardRef} className="card-entity" style={{
            left: positionX,
            top: positionY,
            pointerEvents: isGrabbed ? "none" : "auto",
            rotate: `${rotation}deg`,
            zIndex: zIndex || "auto"
        }}
        onDragStart={context === ECardInteractionContext.TABLE ? onDragStartOnTable : onDragStartInHand}
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