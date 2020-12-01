import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb } from "../../actions";
import { EEntityTypes } from "../../typings";
import {IProps } from "./typings";
import { selectGrabbedEntity } from "../../selectors";
import {cardRotationStepDegree} from "../../config";
import { Entity } from "../Entity";
import { getCardDimensions } from "../../utils";

export const CardEntity = ({entityId, positionX, positionY, faceUp, metadata, zIndex, grabbedBy, rotation = 0 }: IProps) => {

    const dispatch = useDispatch();

    const entityRef = useRef<HTMLDivElement>(null);

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;
    const {back, type, name} = metadata;
    const {width, height} = getCardDimensions(type);

    const onClick = () => {
        dispatch(emitFlipVerb(entityId));
    }

    const displayedSVG = faceUp ? `${type}/${name}` : `${type}/${back}`

    return (
        <Entity 
            entityId={entityId}
            entityType={EEntityTypes.CARD}
            positionX={positionX}
            positionY={positionY}
            width={width}
            height={height}
            rotation={rotation}
            zIndex={zIndex}
            rotationStep={cardRotationStepDegree}
            clickPassThrough={isGrabbed}
            boundToTable={false}
            grabbedBy={grabbedBy}
            svgEndpoint={displayedSVG}

            ref={entityRef}

            eventHandlers={{
                onClick
            }}
        />
    )
}