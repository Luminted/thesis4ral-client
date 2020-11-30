import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import {IProps } from "./typings";
import { selectGrabbedEntity } from "../../selectors";
import {cardRotationStepDegree} from "../../config";
import { Entity } from "../Entity";
import { getCardDimensions } from "../../utils";

export const CardEntity = ({entityId, positionX, positionY, faceUp, metadata, zIndex, rotation = 0 }: IProps) => {

    const dispatch = useDispatch();

    const entityRef = useRef<HTMLDivElement>(null);

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const {width, height} = getCardDimensions(metadata.type);

    const onClick = () => {
        dispatch(emitFlipVerb(entityId));
    }

    const displayedSVG = faceUp ? `${metadata.type}/${metadata.name}` : `${metadata.type}/${metadata.back}`

    return (
        <Entity 
            entityId={entityId}
            entityType={EntityTypes.CARD}
            positionX={positionX}
            positionY={positionY}
            width={width}
            height={height}
            rotation={rotation}
            zIndex={zIndex}
            rotationStep={cardRotationStepDegree}
            clickPassThrough={isGrabbed}
            boundToTable={false}
            svgEndpoint={displayedSVG}

            ref={entityRef}

            eventHandlers={{
                onClick
            }}
        />
    )
}