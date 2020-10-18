import React, { DragEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { emitGrabVerb, emitRotateVerb } from "../../actions";
import { IProps } from "./typings";
import "./style.css";


export const Entity = ({
    entityId,
    entityType, 
    positionX, 
    positionY, 
    rotation, 
    zIndex, 
    clickPassThrough, 
    rotationStep, 
    graphicalContent, 
    menuContent,
    eventHandlers
    }: IProps) => {

    const dispatch = useDispatch();

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId,entityType, rotationStep));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        dispatch(emitGrabVerb(entityId, entityType, e.clientX, e.clientY));
    }

    return (
        <div draggable={true} className="entity" style={{
            left: positionX,
            top: positionY,
            pointerEvents: clickPassThrough ? "none" : "auto",
            rotate: `${rotation}deg`,
            zIndex: zIndex || "auto"
        }}
        onDragStart={onDragStart}
        onContextMenu={onRightClick}

        {...eventHandlers}>
            {menuContent && <div className="entity-menu">{menuContent}</div>}
            <div>{graphicalContent}</div>
        </div>
    )
}