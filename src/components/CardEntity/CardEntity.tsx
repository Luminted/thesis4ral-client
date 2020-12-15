import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb } from "../../actions";
import { EEntityTypes } from "../../typings";
import { IProps } from "./typings";
import { selectGrabbedEntityInfo } from "../../selectors";
import { cardRotationStepDegree } from "../../config";
import { Entity } from "../Entity";
import { getCardDimensions } from "../../utils";
import { style } from "./style";

export const CardEntity = ({ entityId, positionX, positionY, faceUp, metadata, zIndex, grabbedBy, rotation = 0 }: IProps) => {
  const dispatch = useDispatch();

  const entityRef = useRef<HTMLDivElement>(null);

  const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

  const isGrabbed = grabbedEntityInfo?.entityId === entityId;
  const { back, type, name } = metadata;
  const {width: baseWidth, height: baseHeight} = getCardDimensions(type);

  const onClick = () => {
    dispatch(emitFlipVerb(entityId));
  };

  const displayedSVG = faceUp ? `${type}/${name}` : `${type}/${back}`;
  const highlightClass = grabbedBy ? "card-entity__drag-highlight" : "card-entity__mouse-highlight";

  return (
    <>
      <Entity
        entityId={entityId}
        entityType={EEntityTypes.CARD}
        positionX={positionX}
        positionY={positionY}
        width={baseWidth}
        height={baseHeight}
        rotation={rotation}
        zIndex={zIndex}
        rotationStep={cardRotationStepDegree}
        clickPassThrough={isGrabbed}
        boundToTable={false}
        grabbedBy={grabbedBy}
        svgEndpoint={displayedSVG}
        entityCoreClassnames={["card-entity", highlightClass]}
        ref={entityRef}
        eventHandlers={{
          onClick,
        }}
      />
      <style jsx={true}>{style}</style>
    </>
  );
};
