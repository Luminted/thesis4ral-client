import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceUpVerb, emitResetVerb, emitShuffleVerb } from "../../actions";
import { selectGrabbedEntity } from "../../selectors";
import { EEntityTypes } from "../../typings";
import { IProps } from "./interfaces";
import {Entity} from "../Entity";
import {deckRotationStepDegree} from "../../config";
import { getCardDimensions } from "../../utils";

export const DeckEntity = ({entityId, positionX, positionY, zIndex, rotation, grabbedBy, metadata}: IProps) => {
    
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;
    const {name, type} = metadata;
    const {height, width} = getCardDimensions(type)

    const onClick = () => {
        if(grabbedEntity === null){
            dispatch(emitDrawFaceUpVerb(entityId));
        }
    }

    const onShuffle = () => dispatch(emitShuffleVerb(entityId));

    const onReset =() => dispatch(emitResetVerb(entityId));
    return (
        <>
       <Entity 
            entityId={entityId} 
            entityType={EEntityTypes.DECK} 
            clickPassThrough={isGrabbed} 
            positionX={positionX}
            positionY={positionY}
            width={width}
            height={height}
            zIndex={zIndex}
            rotation={rotation}
            rotationStep={deckRotationStepDegree}
            boundToTable={true}
            grabbedBy={grabbedBy}
            svgEndpoint={`${type}/${name}`}

            eventHandlers={{
                onClick
            }}
            menuContent={
                <>
                <div>
                    <button onClick={onShuffle}>Shuffle</button>
                </div>
                <div>
                    <button onClick={onReset}>Reset</button>
                </div>
                </>}
            />
        </>)
}