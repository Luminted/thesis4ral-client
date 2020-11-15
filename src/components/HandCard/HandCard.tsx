import React, { CSSProperties, useRef, DragEvent, useState, useEffect, useMemo, Ref } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { emitGrabFromHand } from "../../actions";
import { SVGLoader } from "../SVGLoader";
import { IProps } from "./typings";
import {style} from "./style";
import { downscale } from "../../utils";
import { selectHorizontalScalingRatio, selectOwnClientInfo, selectVerticalScalingRatio } from "../../selectors";
import { MaybeNull } from "../../types/genericTypes";

export const HandCard = ({entityId, inHandOf, positionX, positionY, rotation, isMirrored, isRevealed, metadata}: IProps) => {
    const dispatch = useDispatch();

    const clientInfo = useSelector(selectOwnClientInfo);

    const [cardElement, setCardElement] = useState<MaybeNull<HTMLDivElement>>(null);

    const horizontalScalingRatio = useSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useSelector(selectVerticalScalingRatio);

    const onDragStartInHand = (e: DragEvent) => {
        e.preventDefault();
        if(cardElement){
            const {left, right, top, bottom} = cardElement.getBoundingClientRect();
            const {clientX, clientY} = e;
            dispatch(emitGrabFromHand(entityId,clientX, clientY, inHandOf, isMirrored ? right: left, isMirrored ? bottom : top));
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
        <>
        <div
            className={cn("hand-card", {"hand-card--own": clientInfo?.clientId === inHandOf})}
            style={calculatedCSS}

            ref={setCardElement}

            onDragStart={onDragStartInHand}>
            <SVGLoader endpoint={svgUrl} />
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}