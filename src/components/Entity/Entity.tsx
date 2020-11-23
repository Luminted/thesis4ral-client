import React, { CSSProperties, DragEvent, MouseEvent, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabVerb, emitRotateVerb } from "../../actions";
import { IProps } from "./typings";
import { Ratio } from "../../types/additionalTypes";
import { selectTablePixelDimensions } from "../../selectors";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";
import { downscale } from "../../utils";
import { setGrabbedEntityInfo } from "../../actions/setterActions/";
import "./style.css";
import { EntityCore } from "../EntityCore";

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
    isMirrored,
    svgEndpoint,
    boundToTable,
    menuContent,
    eventHandlers
    }, ref) => {

    const dispatch = useDispatch();

    const tablePixelDimensions = useSelector(selectTablePixelDimensions);

    const customOnDragHandler = eventHandlers?.onDragStart;
    //TODO: what?
    delete eventHandlers?.onDragStart;

    const horizontalScalingRatio: Ratio = useMemo(() => ({
            numerator: tablePixelDimensions?.width || 0,
            divisor: tableVirtualWidth
    }), [tablePixelDimensions])

    const verticalScalingRatio: Ratio = useMemo(() => ({
            numerator: tablePixelDimensions?.height || 0,
            divisor: tableVirtualHeight

    }), [tablePixelDimensions])

    const downscaledPositionX = downscale(horizontalScalingRatio, positionX);
    const downscaledPositionY = downscale(verticalScalingRatio, positionY);

    const computedCSS: CSSProperties = useMemo(() => {
        return {
            rotate: `${isMirrored ? 180 + rotation : rotation}deg`,
            ...isMirrored ? 
            {
                right: downscaledPositionX,
                bottom: downscaledPositionY,
            } :
            {
                left: downscaledPositionX,
                top: downscaledPositionY,
            }
        }
    }, [ rotation, downscaledPositionX, downscaledPositionY]) 

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId,entityType, rotationStep));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        if(customOnDragHandler){
            customOnDragHandler(e);
        }
        else{
            dispatch(emitGrabVerb(entityId, entityType, e.clientX, e.clientY));
        }

        const {clientX, clientY} = e;
        const {top, left, width: targetWidth, height: targetHeight} = e.currentTarget.getBoundingClientRect();
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;

        dispatch(setGrabbedEntityInfo({
            entityType,
            height: targetHeight,
            width: targetWidth,
            relativeGrabbedAtX: relativeMouseX,
            relativeGrabbedAtY: relativeMouseY,
            restricted: boundToTable
        }));
    }
    

    return (
        <div ref={ref} className="entity" style={{
            zIndex: zIndex || "auto",
            pointerEvents: clickPassThrough ? "none" : "auto",
            ...computedCSS
        }}>
            {menuContent && <div className="entity__menu">{menuContent}</div>}
            <EntityCore width={width} height={height} graphicEndpoint={svgEndpoint} eventHandlerMapping={{
                onDragStart,
                onContextMenu: onRightClick
            }} />
        </div>
    )
})