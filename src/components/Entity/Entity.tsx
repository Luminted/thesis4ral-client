import React, { CSSProperties, DragEvent, MouseEvent, useMemo } from "react";
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
    isMirrored,
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

    const cssPositionAndRotation: CSSProperties = isMirrored ? {
        right: positionX,
        bottom: positionY,
        rotate: `${180 + rotation}deg`
    }: {
        left: positionX,
        top: positionY,
        rotate: `${rotation}deg`
    }

    return (
        <div className="entity" style={{
            zIndex: zIndex || "auto",
            pointerEvents: clickPassThrough ? "none" : "auto",
            ...cssPositionAndRotation
        }}>
            {menuContent && <div className="entity-menu">{menuContent}</div>}
            <div 
            draggable={true}

            onDragStart={onDragStart}
            onContextMenu={onRightClick}
            {...eventHandlers}>
                {graphicalContent}
            </div>
        </div>
    )
}