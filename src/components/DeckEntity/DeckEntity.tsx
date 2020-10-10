import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDeckVerb, emitSharedVerb } from "../../actions";
import { selectDeckById } from "../../selectors";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { DeckVerbTypes, SharedVerbTypes } from "../../types/verbTypes";
import { style } from "./style";
import { IProps } from "./interfaces";

export const DeckEntity = ({entityId}: IProps) => {
    
    const dispatch = useDispatch();

    const deckEntityDetails = useSelector(selectDeckById(entityId));

    const {positionX, positionY, zIndex} = deckEntityDetails || {};

    const onMouseUp = (e: MouseEvent) => {
        const {clientX, clientY} = e;
        dispatch(emitDeckVerb(clientX, clientY, DeckVerbTypes.DRAW_FACE_UP, entityId));
    }

    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        dispatch(emitSharedVerb(clientX, clientY, SharedVerbTypes.GRAB, entityId, EntityTypes.DECK));
    }

    return (
        <>
        <div draggable={true} className="deck-entity" style={{
            left: positionX,
            top: positionY,
            zIndex
        }}
        onDragStart={onDragStart}
        onMouseUp={onMouseUp}
        >
            <div style={{
                width: 65,
                height: 88,
                background: "red"
            }}></div>
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}