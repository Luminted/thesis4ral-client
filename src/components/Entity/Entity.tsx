import React, { CSSProperties, DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabVerb, emitRotateVerb, setGrabbedEntityInfo } from "../../actions";
import { IProps } from "./typings";
import { selectHorizontalScalingRation, selectIsMirrored, selectVerticalScalingRation } from "../../selectors";
import { downscale } from "../../utils";
import "./style.css";
import { EntityCore } from "../EntityCore";
import { useGetEntityHighlightColor } from "../../hooks";
import { grabEntity } from "../../utils/grabEntity";

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
    entityCoreClassnames,
    grabbedBy,
    menuContent,
    eventHandlers
    }, ref) => {

    const dispatch = useDispatch();

    const highlightColor = useGetEntityHighlightColor(grabbedBy);
    const horizontalScalingRatio = useSelector(selectHorizontalScalingRation);
    const verticalScalingRatio = useSelector(selectVerticalScalingRation);
    const isMirrored = useSelector(selectIsMirrored);

    const downscaledPositionX = downscale(horizontalScalingRatio, positionX);
    const downscaledPositionY = downscale(verticalScalingRatio, positionY);

    const entityCSS: CSSProperties = {
        zIndex,
        transform: `rotate(${rotation}deg)`,
        left: downscaledPositionX,
        top: downscaledPositionY,
        pointerEvents: clickPassThrough ? "none" : "auto",
        boxShadow: highlightColor ? `0 0 0.5vh 0.5vh ${highlightColor}` : undefined
    }

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId,entityType, rotationStep));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        
        const {clientX, clientY} = e;
        const {top, left, right, bottom, width: targetWidth, height: targetHeight} = e.currentTarget.getBoundingClientRect();
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;
        grabEntity(dispatch,
            entityId,
            entityType,
            clientX,
            clientY,
            targetWidth,
            targetHeight,
            relativeMouseX,
            relativeMouseY,
            boundToTable,
            (isMirrored ? right : left),
            (isMirrored ? bottom : top)
            )
    }
    

    return (
        <div ref={ref} className="entity" style={{
            ...entityCSS
        }}>
            {menuContent && <div className="entity__menu">{menuContent}</div>}
            <EntityCore classnames={entityCoreClassnames} width={width} height={height} graphicEndpoint={svgEndpoint} eventHandlerMapping={{
                onDragStart,
                onContextMenu: onRightClick,
                ...eventHandlers
            }} />
        </div>
    )
})