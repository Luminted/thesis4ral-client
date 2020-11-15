import React, {useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import interpolatingPolynomial from "interpolating-polynomial";
import { emitPutInHandVerb } from "../../actions";
import { selectClientHandById, selectClientId, selectGrabbedEntity } from "../../selectors";
import {IProps} from "./typings";
import { calculateAdjacentAngle, calculateDistance } from "../../utils"
import "./style.css";
import { HandCard } from "../HandCard";

//TODO: move to config
const cardTiltFactor = 1;

const getCardTiltAngle = (handWidth: number, handHeight: number, cardPosition: [number, number], tiltFactor: number) => {
    const [cardX, cardY] = cardPosition;
    const pivotPointX = handWidth / 2;
    const pivotPointY = -cardTiltFactor * handHeight;
    const adjacentSideLength = calculateDistance([pivotPointX, pivotPointY], [pivotPointX, cardY]);
    const hypotenuseLength = calculateDistance([pivotPointX, pivotPointY], [cardX, cardY]);
    const tiltAngle = calculateAdjacentAngle(adjacentSideLength, hypotenuseLength);
    return pivotPointX >= cardX ? -tiltAngle : tiltAngle;
}

export const Hand = ({clientId, isMirrored}: IProps) => {

    const dispatch = useDispatch();

    const handRef = useRef<HTMLDivElement>(null);
    const handCurveFunctionRef = useRef<(y: number) => number>();

    const handDetails = useSelector(selectClientHandById(clientId));
    const grabbedEntity = useSelector(selectGrabbedEntity);
    const ownClientId = useSelector(selectClientId);

    const isOwnHand = useMemo(() => ownClientId === clientId, [ownClientId]);
    const renderedCards = useMemo(() => {
        if(handDetails && handRef.current && handCurveFunctionRef.current){
            const {width, height} = handRef.current!.getBoundingClientRect();
            const step = width / (handDetails.cards.length + 1);

            return handDetails.cards.map( (card, index) => {
                const positionX = step * (index + 1);
                const positionY = handCurveFunctionRef.current!(positionX);
                const tiltAngle = getCardTiltAngle(width, height, [positionX, positionY], cardTiltFactor);
                console.log(positionX, positionY, tiltAngle)
               return <HandCard
                entityId={card.entityId}
                positionX={positionX}
                positionY={positionY}
                rotation={tiltAngle}
                inHandOf={handDetails.clientId}
                isRevealed={true}
                metadata={card.metadata}
                key={card.entityId}/>
            })
        }
        else{
            return [];
        }
    }, [handDetails?.cards ,handRef, handCurveFunctionRef]);
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        if(grabbedEntity && isOwnHand){
            dispatch(emitPutInHandVerb(grabbedEntity.entityId));
            e.stopPropagation();
        }
    }, [grabbedEntity, isOwnHand]);

    const calculateHandCurve = useCallback(() => {
        const handElement = handRef.current;
        if(handElement){
            const {height, width} = handElement.getBoundingClientRect();
            handCurveFunctionRef.current = interpolatingPolynomial([[0, height], [width / 2, height / 2], [width, height]]);
        }
    }, [handRef])

    // Event listener has to be applied natively to stop bubbling to ApplicationViewports mouseup listener
    useEffect(() => {
        handRef.current?.addEventListener('mouseup', onMouseUp);
        return () => handRef.current?.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUp]);

    useEffect(() => {
        calculateHandCurve();
        window.addEventListener("resize", calculateHandCurve);
        return () => window.removeEventListener("resize", calculateHandCurve);
    }, [calculateHandCurve]);

    return ( 
        <>
        { <div ref={handRef} className={`hand ${isOwnHand ? "hand--own-hand" : "hand--parner-hand"}`}>
        {renderedCards}
        </div>}
        </>
    )
}