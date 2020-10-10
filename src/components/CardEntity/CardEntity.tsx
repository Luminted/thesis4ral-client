import React, { DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitSharedVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { SharedVerbTypes } from "../../types/verbTypes";
import {Props, CardInteractionContext } from "./typings";
import {style} from "./style";
import { selectCardById, selectGrabbedEntity } from "../../selectors";

export const CardEntity = ({entityId, context, scale = 1}: Props) => {

    const dispatch = useDispatch();

    const cardEntityDetails = useSelector(selectCardById(entityId));
    const grabbedEntity = useSelector(selectGrabbedEntity);

    const {positionX, positionY, zIndex} = cardEntityDetails || {};
    const isGrabbed = grabbedEntity?.entityId === entityId;

    const onDragStartOnTable = (e: DragEvent) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        console.log('dragStarted')
        dispatch(emitSharedVerb(clientX, clientY, SharedVerbTypes.GRAB, entityId, EntityTypes.CARD));
    }

    return (
        <>
        <div draggable={true} className="card-entity" style={{
            left: positionX,
            top: positionY,
            pointerEvents: isGrabbed ? "none" : "auto",
            zIndex
        }}
        onDragStart={context === CardInteractionContext.TABLE ? onDragStartOnTable : undefined}>
            <div style={{
                width: 56,
                height: 88,
                background: "blue"
            }}></div>
        </div>
            <style jsx={true}>{style}</style>
        </>
    )
}