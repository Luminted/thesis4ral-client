import React, { DragEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitFlipVerb, emitGrabVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import {IProps } from "./typings";
import { selectGrabbedEntity } from "../../selectors";
import {cardRotationStepDegree} from "../../config";
import { Entity } from "../Entity";

export const CardEntity = ({entityId, positionX, positionY, faceUp, metadata, isMirrored, zIndex, rotation = 0 }: IProps) => {

    const dispatch = useDispatch();

    const entityRef = useRef<HTMLDivElement>(null);

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

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
            // TODO: make this configurable
            width={560}
            height={880}
            rotation={rotation}
            zIndex={zIndex}
            rotationStep={cardRotationStepDegree}
            clickPassThrough={isGrabbed}
            isMirrored={isMirrored}
            boundToTable={false}
            svgEndpoint={displayedSVG}

            ref={entityRef}

            eventHandlers={{
                onClick
            }}
        />
    )
}