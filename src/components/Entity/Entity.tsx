import React, { CSSProperties, DragEvent, MouseEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabVerb, emitRotateVerb } from "../../actions";
import { IProps } from "./typings";
import "./style.css";
import { Ratio } from "../../types/additionalTypes";
import { selectTablePixelDimensions } from "../../selectors";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";
import { downscale } from "../../utils";


export const Entity = ({
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
    isMirrored,
    graphicalContent, 
    menuContent,
    eventHandlers
    }: IProps) => {

    const dispatch = useDispatch();

    const tablePixelDimensions = useSelector(selectTablePixelDimensions);

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId,entityType, rotationStep));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        dispatch(emitGrabVerb(entityId, entityType, e.clientX, e.clientY));
    }

    const cssPositionAndRotation: CSSProperties = useMemo(() => {
        if(tablePixelDimensions){
            const horizontalScalingRatio: Ratio = {
                numerator: tablePixelDimensions.width,
                divisor: tableVirtualWidth
            }
            const verticalScalingRatio: Ratio = {
                numerator: tablePixelDimensions.height,
                divisor: tableVirtualHeight
            }
            const downscaledPositionX = downscale(horizontalScalingRatio, positionX);
            const downscaledPositionY = downscale(verticalScalingRatio, positionY);
            const downscaledWidth = downscale(horizontalScalingRatio, width);
            const downscaledHeight = downscale(horizontalScalingRatio, height);

            return isMirrored ? {
                right: downscaledPositionX,
                bottom: downscaledPositionY,
                width: downscaledWidth,
                height: downscaledHeight,
                rotate: `${180 + rotation}deg`
            }: {
                left: downscaledPositionX,
                top: downscaledPositionY,
                width: downscaledWidth,
                height: downscaledHeight,
                rotate: `${rotation}deg`
            }
        }

        return {}
    }, [positionX, positionY, rotation, tablePixelDimensions, isMirrored]) 
    

    return (
        <div className="entity" style={{
            zIndex: zIndex || "auto",
            pointerEvents: clickPassThrough ? "none" : "auto",
            ...cssPositionAndRotation
        }}>
            {menuContent && <div className="entity__menu">{menuContent}</div>}
            <div
            className="entity__graphic"
            draggable={true}

            onDragStart={onDragStart}
            onContextMenu={onRightClick}
            {...eventHandlers}>
                {graphicalContent}
            </div>
        </div>
    )
}