import React, {useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import interpolatingPolynomial from "interpolating-polynomial";
import cn from "classnames";
import { emitPutInHandVerb } from "../../actions";
import { selectClientHandById, selectClientId, selectGrabbedEntity } from "../../selectors";
import {IProps} from "./typings";
import { calculateAdjacentAngle, calculateDistance } from "../../utils"
import "./style.css";
import { HandCard } from "../HandCard";
import { EOrientation } from "../../types/additionalTypes";
import { setGrabbedEntityInfo } from "../../actions/setterActions";

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

export const Hand = ({clientId, isMirrored, orientation}: IProps) => {

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

               return <HandCard
                entityId={card.entityId}
                positionX={positionX}
                positionY={positionY}
                rotation={tiltAngle}
                inHandOf={handDetails.clientId}
                isMirrored={isMirrored}
                isRevealed={false}
                faceUp={isOwnHand}
                metadata={card.metadata}
                key={card.entityId}/>
            })
        }
        else{
            return [];
        }
    }, [handDetails?.cards ,handRef, handCurveFunctionRef.current]);
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        if(grabbedEntity && isOwnHand){
            e.stopPropagation();
            dispatch(emitPutInHandVerb(grabbedEntity.entityId, false, true));
            dispatch(setGrabbedEntityInfo(null));
        }
    }, [grabbedEntity, isOwnHand]);

    const calculateHandCurve = useCallback(() => {
        const handElement = handRef.current;
        if(handElement){
            const {height, width} = handElement.getBoundingClientRect();
            handCurveFunctionRef.current = interpolatingPolynomial([[0, height], [width / 2, height / 2], [width, height]]);
        }
    }, [handRef]);

    // Event listener has to be applied natively to stop bubbling to ApplicationViewports mouseup listener
    useEffect(() => {
        handRef.current?.addEventListener('mouseup', onMouseUp);
        return () => handRef.current?.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUp]);

    useEffect(() => {
        calculateHandCurve();
        window.addEventListener("resize", calculateHandCurve);
        console.log("hand resize")
        return () => window.removeEventListener("resize", calculateHandCurve);
    }, [calculateHandCurve]);

    const isHandMirrored = (isMirrored && orientation === EOrientation.SOUTH) || (!isMirrored && orientation === EOrientation.NORTH);

    return ( 
        <>
        { <div ref={handRef}
         className={cn("hand", {"hand--own-hand": isOwnHand}, {"hand--partner-hand": !isOwnHand}, {"hand--mirrored": isHandMirrored})}>
        {renderedCards}
        </div>}
        </>
    )
}