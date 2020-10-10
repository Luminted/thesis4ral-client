import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { emitSharedVerb } from "../../actions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { SharedVerbTypes } from "../../types/verbTypes";
import {Props, CardContext } from "./typings";
import {style} from "./style";
import { useTypedSelector } from "../../store";
import { selectCardById } from "../../selectors";

export const CardEntity = ({entityId, context, scale = 1}: Props) => {

    const dispatch = useDispatch();

    const cardEntityRef = useRef<HTMLDivElement>(null);

    const cardEntityDetails = useTypedSelector(selectCardById(entityId));

    const {positionX, positionY, zIndex} = cardEntityDetails || {};
    console.log('details', cardEntityDetails)

    const onDragStart = useCallback((e: DragEvent) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        console.log('dragStarted')
        dispatch(emitSharedVerb(clientX, clientY, SharedVerbTypes.GRAB, entityId, EntityTypes.CARD));
    }, [])

    useEffect(() => {
        const cardEntityElement = cardEntityRef.current;
        if(cardEntityElement){
            if(context = CardContext.TABLE){
                cardEntityElement.addEventListener("dragstart", onDragStart);
                return () => cardEntityElement.removeEventListener("dragstart", onDragStart);
            }
        }
    }, [])

    return (
        <>
        <div ref={cardEntityRef} draggable={true} className="card-entity" style={{
            left: positionX,
            top: positionY,
            zIndex
        }}>
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