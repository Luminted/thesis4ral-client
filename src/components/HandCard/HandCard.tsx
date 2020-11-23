import React, { CSSProperties, DragEvent, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { emitGrabFromHand } from "../../actions";
import { SVGLoader } from "../SVGLoader";
import { IProps } from "./typings";
import {style} from "./style";
import { downscale } from "../../utils";
import { selectHorizontalScalingRatio, selectVerticalScalingRatio } from "../../selectors";
import { MaybeNull } from "../../types/genericTypes";
import { setGrabbedEntityInfo } from "../../actions/setterActions";
import { EntityTypes } from "../../types/dataModelDefinitions";

export const HandCard = ({entityId, inHandOf, positionX, positionY, zIndex, faceUp, rotation, isMirrored, isRevealed, metadata, onMouseEnter, onMouseLeave, hoverFeedback}: IProps) => {
    const dispatch = useDispatch();

    const [cardElement, setCardElement] = useState<MaybeNull<HTMLDivElement>>(null);

    const horizontalScalingRatio = useSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useSelector(selectVerticalScalingRatio);

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        if(cardElement){
            // TODO: use target instead of ref
            const {left, right, top, bottom, width, height} = cardElement.getBoundingClientRect();
            const {clientX, clientY} = e;
            const relativeMouseX = clientX - left;
            const relativeMouseY = clientY - top;
            
            dispatch(emitGrabFromHand(entityId, clientX, clientY, inHandOf, isMirrored ? right: left, isMirrored ? bottom : top, false));
            dispatch(setGrabbedEntityInfo({
                entityType: EntityTypes.CARD,
                height,
                width,
                relativeGrabbedAtX: relativeMouseX,
                relativeGrabbedAtY: relativeMouseY,
                restricted: false
            }));
        }
    }

    // TODO: make dimensions dynamic
    const downscaledWidth = useMemo(() => downscale(horizontalScalingRatio, 560), [horizontalScalingRatio]);
    const downscaledHeight = useMemo(() =>downscale(horizontalScalingRatio, 880), [verticalScalingRatio]);

    const calculatedCSS: CSSProperties = {
        left: positionX - (downscaledWidth / 2),
        top: positionY - (downscaledHeight / 2),
        rotate: `${rotation}deg`,
        width: downscaledWidth,
        height: downscaledHeight,
        zIndex
    }

    const svgUrl =  faceUp ? `${metadata.type}/${metadata.name}` : `${metadata.type}/${metadata.back}`;

    return (
        <>
        <div
            className={cn("hand-card", {"hand-card--feedback": hoverFeedback})}
            style={calculatedCSS}

            ref={setCardElement}

            onDragStart={onDragStart}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <SVGLoader endpoint={svgUrl} />
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}