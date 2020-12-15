import React, { CSSProperties, DragEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { emitGrabFromHand, setGrabbedEntityInfo } from "../../actions";
import { IProps } from "./typings";
import { EEntityTypes } from "../../typings";
import { EntityCore } from "../EntityCore";
import { getCardDimensions } from "../../utils";
import { style } from "./style";
import { selectIsMirrored } from "../../selectors";

const onHoverTranslatePercentageX = -50;
const onHoverTranslatePercentageY = -70;

export const HandCard = ({ entityId, inHandOf, positionX, positionY, zIndex, faceUp, rotation, metadata, onMouseEnter, onMouseLeave, hoverFeedback }: IProps) => {
  const dispatch = useDispatch();

  const handCardRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const isMirrored = useSelector(selectIsMirrored);

  const {width: baseWidth, height: baseHeight} = getCardDimensions(metadata.type);

  const onDragStart = (e: DragEvent) => {
    e.preventDefault();

    const cardElement = handCardRef.current;
    if (cardElement) {
      const { width: cardWidth, height: cardHeight, right, left, top, bottom } = cardElement.getBoundingClientRect();
      const { clientX, clientY } = e;
      const relativeMouseX = clientX - left;
      const relativeMouseY = clientY - top;

      dispatch(emitGrabFromHand(entityId, clientX, clientY, inHandOf, isMirrored ? right : left, isMirrored ? bottom : top, false));
      dispatch(
        setGrabbedEntityInfo({
          entityId,
          height: cardHeight,
          width: cardWidth,
          entityType: EEntityTypes.CARD,
          relativeGrabbedAtX: relativeMouseX,
          relativeGrabbedAtY: relativeMouseY,
          restricted: false,
          grabbedFromHand: inHandOf,
        }),
      );
    }
  };

  const transformCSS = isHovered ? `translate(${onHoverTranslatePercentageX}%, ${onHoverTranslatePercentageY}%)` : `translate(-50%, -60%)`;
  const rotationCSS: CSSProperties = {
    transform: `rotate(${rotation}deg)`,
  };
  const calculatedCSS: CSSProperties = {
    left: positionX,
    top: positionY,
    transform: transformCSS,
    zIndex,
  };

  const svgUrl = faceUp ? `${metadata.type}/${metadata.name}` : `${metadata.type}/${metadata.back}`;

  return (
    <>
      <div
        ref={handCardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn("hand-card", { "hand-card--feedback": hoverFeedback })}
        style={calculatedCSS}
      >
        <div style={rotationCSS}>
          <EntityCore
            width={baseWidth}
            height={baseHeight}
            eventHandlerMapping={{
              onDragStart,
              onMouseEnter,
              onMouseLeave,
            }}
            classnames={["hand-card__entity-core"]}
            graphicEndpoint={svgUrl}
          />
        </div>
      </div>
      <style jsx={true}>{style}</style>
    </>
  );
};
