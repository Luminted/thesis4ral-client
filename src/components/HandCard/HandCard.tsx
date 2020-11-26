import React, { CSSProperties, DragEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { emitGrabFromHand } from "../../actions";
import { IProps } from "./typings";
import "./style.css";
import { setGrabbedEntityInfo } from "../../actions/setterActions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { EntityCore } from "../EntityCore";
import {getCardDimensions} from "../../utils";

export const HandCard = ({entityId, inHandOf, positionX, positionY, zIndex, faceUp, rotation, isMirrored, isRevealed, metadata, onMouseEnter, onMouseLeave, hoverFeedback}: IProps) => {
    const dispatch = useDispatch();

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        
        const {left, right, top, bottom, width, height} = e.currentTarget.getBoundingClientRect();
        const {clientX, clientY} = e;
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;
        
        dispatch(emitGrabFromHand(entityId, clientX, clientY, inHandOf, isMirrored ? right: left, isMirrored ? bottom : top, false));
        dispatch(setGrabbedEntityInfo({
            height,
            width,
            entityType: EntityTypes.CARD,
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
        rotate: `${rotation}deg`,
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