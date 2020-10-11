import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceUpVerb, emitGrabVerb } from "../../actions";
import { selectDeckById, selectGrabbedEntity } from "../../selectors";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { DeckVerbTypes, SharedVerbTypes } from "../../types/verb";
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

    return (
        <>
        {deckEntityDetails && <div draggable={true} className="deck-entity" style={{
            left: deckEntityDetails.positionX,
            top: deckEntityDetails.positionY,
            pointerEvents: isGrabbed ? "none" : "auto",
            rotate: `${deckEntityDetails.rotation % 360}deg`,
            zIndex: deckEntityDetails.zIndex
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
        </div>}
        <style jsx={true}>{style}</style>
        </>
    )
}