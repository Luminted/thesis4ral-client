import React, {useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitPutInHandVerb } from "../../actions";
import { selectClientHandById, selectClientId, selectGrabbedEntity } from "../../selectors";
import {IProps} from "./typings";
import "./style.css";
import { CardEntity } from "../CardEntity";
import { ECardInteractionContext } from "../CardEntity/typings";

export const Hand = ({clientId}: IProps) => {

    const dispatch = useDispatch();

    const handRef = useRef<HTMLDivElement>(null);

    const handDetails = useSelector(selectClientHandById(clientId));
    const grabbedEntity = useSelector(selectGrabbedEntity);
    const ownClientId = useSelector(selectClientId);

    const isOwnHand = useMemo(() => ownClientId === clientId, []);

    const onMouseUp = useCallback((e: MouseEvent) => {
        if(grabbedEntity && isOwnHand){
            dispatch(emitPutInHandVerb(grabbedEntity.entityId));
            e.stopPropagation();
        }
    }, [grabbedEntity, isOwnHand])

    // Event listener has to be applied natively to stop bubbling to ApplicationViewports mouseup listener
    useEffect(() => {
        handRef.current?.addEventListener('mouseup', onMouseUp);
        return () => handRef.current?.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUp])

    const renderedCards = useMemo(() => handDetails?.cards.map( (card, index) => 
        <CardEntity
        positionX={index * 40}
        positionY={0}
         context={ECardInteractionContext.TABLE}
         {...card }/>), [handDetails?.cards])

    return ( 
        <>
        { handDetails && <div ref={handRef} className={`hand ${isOwnHand ? "hand--own-hand" : "hand--parner-hand"}`}>
        {renderedCards}
        </div>}
        </>
    )
}