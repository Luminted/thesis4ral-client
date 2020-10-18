import React, { DragEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb, emitGrabFromHand, emitGrabVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import {IProps, ECardInteractionContext } from "./typings";
import { selectGrabbedEntity } from "../../selectors";
import {cardRotationStepDegree} from "../../config";
import { Entity } from "../Entity";

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

    const onClick = () => {
        dispatch(emitFlipVerb(entityId));
    }

    return (
        <Entity 
            entityId={entityId}
            entityType={EntityTypes.CARD}
            positionX={positionX}
            positionY={positionY}
            rotation={rotation}
            zIndex={zIndex}
            rotationStep={cardRotationStepDegree}
            clickPassThrough={isGrabbed}
            graphicalContent={
                <div style={{
                    width: 56,
                    height: 88,
                    background: faceUp ? "lightblue" : "blue"
                }}></div>
            }
            eventHandlers={{
                onClick,
                onDragStart: context === ECardInteractionContext.TABLE ? onDragStartOnTable : onDragStartInHand
            }}
        />
    )
}