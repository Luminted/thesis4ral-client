import React, { CSSProperties, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { emitGrabFromHand, setGrabbedEntityInfo } from "../../actions";
import { IProps } from "./typings";
import { EEntityTypes } from "../../typings";
import { EntityCore } from "../EntityCore";
import {getCardDimensions} from "../../utils";
import "./style.css";
import { selectIsMirrored } from "../../selectors";

export const HandCard = ({entityId, inHandOf, positionX, positionY, zIndex, faceUp, rotation, metadata, onMouseEnter, onMouseLeave, hoverFeedback}: IProps) => {
    const dispatch = useDispatch();

    const isMirrored = useSelector(selectIsMirrored);

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        
        const {left, right, top, bottom, width, height} = e.currentTarget.getBoundingClientRect();
        const {clientX, clientY} = e;
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;
        
        dispatch(emitGrabFromHand(entityId, clientX, clientY, inHandOf, isMirrored ? right: left, isMirrored ? bottom : top, false));
        dispatch(setGrabbedEntityInfo({
            entityId,
            height,
            width,
            entityType: EEntityTypes.CARD,
            relativeGrabbedAtX: relativeMouseX,
            relativeGrabbedAtY: relativeMouseY,
            restricted: false,
            grabbedFromHand: inHandOf
        }));
    }

    const {width, height} = getCardDimensions(metadata.type);

    const calculatedCSS: CSSProperties = {
        left: positionX,
        top: positionY,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex
    }

    const svgUrl =  faceUp ? `${metadata.type}/${metadata.name}` : `${metadata.type}/${metadata.back}`;

    return (
        <div
            className={cn("hand-card", {"hand-card--feedback": hoverFeedback})}
            style={calculatedCSS}
        >
            <EntityCore 
                width={width}
                height={height} 
                eventHandlerMapping={{
                    onDragStart,
                    onMouseEnter,
                    onMouseLeave
                }}
                graphicEndpoint={svgUrl} />
        </div>
    )
}