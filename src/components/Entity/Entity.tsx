import React, { CSSProperties, DragEvent, MouseEvent, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabVerb, emitRotateVerb } from "../../actions";
import { IProps } from "./typings";
import { Ratio } from "../../types/additionalTypes";
import { selectTablePixelDimensions } from "../../selectors";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";
import { downscale } from "../../utils";
import { SVGLoader } from "../SVGLoader";
import { setGrabbedEntityInfo } from "../../actions/setterActions/";
import "./style.css";

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
    svgEndpoint,
    boundToTable,
    menuContent,
    eventHandlers
    }: IProps) => {

    const dispatch = useDispatch();

    const tablePixelDimensions = useSelector(selectTablePixelDimensions);

    const customOnDragHandler = eventHandlers?.onDragStart;
    delete eventHandlers?.onDragStart;

    const horizontalScalingRatio: Ratio = useMemo(() => ({
            numerator: tablePixelDimensions?.width || 0,
            divisor: tableVirtualWidth
    }), [tablePixelDimensions])

    const verticalScalingRatio: Ratio = useMemo(() => ({
            numerator: tablePixelDimensions?.height || 0,
            divisor: tableVirtualHeight

    }), [tablePixelDimensions])

    const downscaledWidth = useMemo(() => downscale(horizontalScalingRatio, width), [horizontalScalingRatio]);
    const downscaledHeight = useMemo(() =>downscale(horizontalScalingRatio, height), [verticalScalingRatio]);
    const downscaledPositionX = downscale(horizontalScalingRatio, positionX);
    const downscaledPositionY = downscale(verticalScalingRatio, positionY);

    const computedCSS: CSSProperties = useMemo(() => {
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
    }, [positionX, positionY, rotation, downscaledWidth, downscaledHeight, horizontalScalingRatio, verticalScalingRatio, downscaledPositionX, downscaledPositionY]) 

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
            height: targetHeight,
            width: targetWidth,
            relativeGrabbedAtX: relativeMouseX,
            relativeGrabbedAtY: relativeMouseY,
            restricted: boundToTable
        }));
    }
    

    return (
        <div className="entity" style={{
            zIndex: zIndex || "auto",
            pointerEvents: clickPassThrough ? "none" : "auto",
            ...computedCSS
        }}>
            {menuContent && <div className="entity__menu">{menuContent}</div>}
            <div
            className="entity__graphic"
            draggable={true}

            onDragStart={onDragStart}
            onContextMenu={onRightClick}
            {...eventHandlers}>
                <SVGLoader endpoint={svgEndpoint} />
            </div>
        </div>
    )
}