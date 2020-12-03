import React, { CSSProperties, DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabVerb, emitRotateVerb, setGrabbedEntityInfo } from "../../actions";
import { IProps } from "./typings";
import { TRatio } from "../../typings";
import { selectTablePixelDimensions } from "../../selectors";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";
import { downscale } from "../../utils";
import "./style.css";
import { EntityCore } from "../EntityCore";
import { useGetEntityHighlightColor } from "../../hooks/useGetEntityHighlightColor";

export const Entity = React.forwardRef<HTMLDivElement, IProps>(({
    entityId,
    entityType,
    positionX, 
    positionY,
    width,
    height,
    rotation, 
    zIndex,
    clickPassThrough,
    rotationStep, 
    svgEndpoint,
    boundToTable,
    grabbedBy,
    menuContent,
    eventHandlers
    }, ref) => {

    const dispatch = useDispatch();

    const highlightColor = useGetEntityHighlightColor(grabbedBy);
    const tablePixelDimensions = useSelector(selectTablePixelDimensions);

    // TODO: code dupplication
    const horizontalScalingRatio: TRatio = {
            numerator: tablePixelDimensions?.width || 0,
            divisor: tableVirtualWidth
    }

    const verticalScalingRatio: TRatio = {
        numerator: tablePixelDimensions?.height || 0,
        divisor: tableVirtualHeight
    }

    const downscaledPositionX = downscale(horizontalScalingRatio, positionX);
    const downscaledPositionY = downscale(verticalScalingRatio, positionY);

    const computedCSS: CSSProperties = {
        rotate: `${rotation}deg`,
        left: downscaledPositionX,
        top: downscaledPositionY,
    }
    
    const highlightCSS: CSSProperties = {
        border: highlightColor ? `2px solid ${highlightColor}` : undefined
    }

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId,entityType, rotationStep));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        
        const {clientX, clientY} = e;
        const {top, left, width: targetWidth, height: targetHeight} = e.currentTarget.getBoundingClientRect();
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;
        
        dispatch(emitGrabVerb(entityId, entityType, e.clientX, e.clientY));
        dispatch(setGrabbedEntityInfo({
            entityId,
            entityType,
            height: targetHeight,
            width: targetWidth,
            relativeGrabbedAtX: relativeMouseX,
            relativeGrabbedAtY: relativeMouseY,
            restricted: boundToTable,
            originalPositionX: left,
            originalPositionY: top
        }));
    }
    

    return (
        <div ref={ref} className="entity" style={{
            zIndex: zIndex || "auto",
            pointerEvents: clickPassThrough ? "none" : "auto",
            ...computedCSS
        }}>
            <div className="entity__highlight" style={highlightCSS}></div>
            {menuContent && <div className="entity__menu">{menuContent}</div>}
            <EntityCore width={width} height={height} graphicEndpoint={svgEndpoint} eventHandlerMapping={{
                onDragStart,
                onContextMenu: onRightClick,
                ...eventHandlers
            }} />
        </div>
    )
})