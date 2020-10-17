import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceUpVerb, emitGrabVerb, emitResetVerb, emitShuffleVerb } from "../../actions";
import { selectDeckById, selectGrabbedEntity, selectTablePosition } from "../../selectors";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { style } from "./style";
import { IProps } from "./interfaces";
import { emitRotateVerb } from "../../actions/thunks/emitSharedVerb/emitRotateVerb";
import {deckRotationStepDegree} from "../../config";

export const DeckEntity = ({entityId}: IProps) => {
    
    const dispatch = useDispatch();

    const deckEntityDetails = useSelector(selectDeckById(entityId));
    const grabbedEntity = useSelector(selectGrabbedEntity);

    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onClick = () => {
        if(grabbedEntity === null){
            dispatch(emitDrawFaceUpVerb(entityId));
        }
    }

    const onRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(emitRotateVerb(entityId, EntityTypes.DECK, deckRotationStepDegree));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        dispatch(emitGrabVerb(entityId, EntityTypes.DECK, e.clientX, e.clientY));
    }

    const onShuffle = () => dispatch(emitShuffleVerb(entityId));

    const onReset =() => dispatch(emitResetVerb(entityId));

    return (
        <>
        {deckEntityDetails && 
        <div className="deck-entity" style={{
            left: deckEntityDetails.positionX,
            top: deckEntityDetails.positionY,
            rotate: `${deckEntityDetails.rotation}deg`,
            zIndex: deckEntityDetails.zIndex
        }}>
            <div className="deck-entity__interface">
                <div className="deck-entity__interface__button">
                    <button onClick={onShuffle}>Shuffle</button>
                </div>
                <div className="deck-entity__interface__button">
                    <button onClick={onReset}>Reset</button>
                </div>
            </div>
        
            <div draggable={true} style={{
                pointerEvents: isGrabbed ? "none" : "auto",
            }}
            onDragStart={onDragStart}
            onClick={onClick}
            onContextMenu={onRightClick}
            >
            <div style={{
                width: 65,
                height: 88,
                background: "red"
            }}></div>
            </div>
        </div>}
        <style jsx={true}>{style}</style>
        </>
    )
}