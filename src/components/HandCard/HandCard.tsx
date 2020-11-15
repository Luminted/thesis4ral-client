import React, { CSSProperties, useRef, DragEvent, useState, useEffect, useMemo, Ref } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitGrabFromHand } from "../../actions";
import { SVGLoader } from "../SVGLoader";
import { IProps } from "./typings";
import "./style.css";
import { downscale } from "../../utils";
import { selectHorizontalScalingRatio, selectVerticalScalingRatio } from "../../selectors";
import { MaybeNull } from "../../types/genericTypes";

export const HandCard = ({entityId, inHandOf, positionX, positionY, rotation, isRevealed, metadata}: IProps) => {
    const dispatch = useDispatch();

    const [cardElement, setCardElement] = useState<MaybeNull<HTMLDivElement>>(null);

    const horizontalScalingRatio = useSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useSelector(selectVerticalScalingRatio);

    const onDragStartInHand = (e: DragEvent) => {
        e.preventDefault();
        if(cardElement){
            const {left, top} = cardElement.getBoundingClientRect();
            const {clientX, clientY} = e;
            dispatch(emitGrabFromHand(entityId,clientX, clientY, inHandOf, left, top ))
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
    }

    const svgUrl = `${metadata.type}/${metadata.name}`;

    return (
        <div
            className="hand-card"
            style={calculatedCSS}

            ref={setCardElement}

            onDragStart={onDragStartInHand}>
            <SVGLoader endpoint={svgUrl} />
        </div>
    )
}