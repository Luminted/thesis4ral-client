import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceUpVerb, emitResetVerb, emitShuffleVerb } from "../../actions";
import { selectDeckById, selectGrabbedEntity } from "../../selectors";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { IProps } from "./interfaces";
import {Entity} from "../Entity";
import {deckRotationStepDegree} from "../../config";

export const DeckEntity = ({entityId, isMirrored}: IProps) => {
    
    const dispatch = useDispatch();

    const deckEntityDetails = useSelector(selectDeckById(entityId));
    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onClick = () => {
        if(grabbedEntity === null){
            dispatch(emitDrawFaceUpVerb(entityId));
        }
    }

    const onShuffle = () => dispatch(emitShuffleVerb(entityId));

    const onReset =() => dispatch(emitResetVerb(entityId));
    return (
        <>
       {deckEntityDetails && <Entity 
            entityId={entityId} 
            entityType={EntityTypes.DECK} 
            clickPassThrough={isGrabbed} 
            positionX={deckEntityDetails.positionX}
            positionY={deckEntityDetails.positionY}
            width={560}
            height={880}
            zIndex={deckEntityDetails.zIndex}
            rotation={deckEntityDetails.rotation}
            rotationStep={deckRotationStepDegree}
            isMirrored={isMirrored}

            eventHandlers={{
                onClick
            }}

            graphicalContent={<div style={{
                width: 65,
                height: 88,
                background: "red"
            }}></div>}
            menuContent={
                <>
                <div>
                    <button onClick={onShuffle}>Shuffle</button>
                </div>
                <div>
                    <button onClick={onReset}>Reset</button>
                </div>
                </>}
            />}
        </>)
}