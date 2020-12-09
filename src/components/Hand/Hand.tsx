import React, {MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import interpolatingPolynomial from "interpolating-polynomial";
import cn from "classnames";
import { emitPutInHandVerb, emitReorderHandVerb, setGrabbedEntityInfo } from "../../actions";
import { selectClientId, selectGrabbedEntityInfo } from "../../selectors";
import {IProps} from "./typings";
import { calculateAdjacentAngle, calculateDistance } from "../../utils"
import { HandCard } from "../HandCard";
import { EEntityTypes, TGameState, TMaybeNull } from "../../typings";
import { cardTiltFactor } from "../../config";
import "./style.css";

const getCardTiltAngle = (handWidth: number, handHeight: number, cardPosition: [number, number], tiltFactor: number) => {
    const [cardX, cardY] = cardPosition;
    const pivotPointX = handWidth / 2;
    const pivotPointY = -tiltFactor * handHeight;
    const adjacentSideLength = calculateDistance([pivotPointX, pivotPointY], [pivotPointX, cardY]);
    const hypotenuseLength = calculateDistance([pivotPointX, pivotPointY], [cardX, cardY]);
    const tiltAngle = calculateAdjacentAngle(adjacentSideLength, hypotenuseLength);
    return pivotPointX >= cardX ? -tiltAngle : tiltAngle;
}

export const Hand = ({ handDetails}: IProps) => {

    const dispatch = useDispatch();

    const handRef = useRef<HTMLDivElement>(null);
    const handCurveFunctionRef = useRef<(y: number) => number>();

    const [orderOfCardBeingHoveredWithGrabbedOne, setOrderOfCardBeingHoveredWithGrabbedOne] = useState<TMaybeNull<number>>(null);

    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);
    const ownClientId = useSelector(selectClientId);

    const {cards, ordering, clientId} = handDetails;
    const isOwnHand = ownClientId === clientId;

    const getOnMouseEnterHandCard = orderOfCard => () => {
        if(grabbedEntityInfo && grabbedEntityInfo.entityType === EEntityTypes.CARD){
            setOrderOfCardBeingHoveredWithGrabbedOne(orderOfCard);
        }
    }

    const onMouseLeaveHandCard = () => {
        if(grabbedEntityInfo && grabbedEntityInfo.entityType === EEntityTypes.CARD){
            setOrderOfCardBeingHoveredWithGrabbedOne(null);
        }
    }

    const renderCards = () => {
        if(handRef.current && handCurveFunctionRef.current){
            const {width, height} = handRef.current!.getBoundingClientRect();
            const step = width / (cards.length + 1);

            return cards.map( (card, index) => {
                const order = ordering[index];
                const positionXFactor = orderOfCardBeingHoveredWithGrabbedOne !== null && orderOfCardBeingHoveredWithGrabbedOne < order ? order + 1.2 : order + 1;
                const positionX = step * positionXFactor;
                const {entityId, metadata} = card;
                const positionY = handCurveFunctionRef.current!(positionX);
                const tiltAngle = getCardTiltAngle(width, height, [positionX, positionY], cardTiltFactor);

               return <HandCard
                entityId={entityId}
                positionX={positionX}
                positionY={positionY}
                zIndex={order}
                rotation={tiltAngle}
                inHandOf={clientId}
                faceUp={isOwnHand}
                metadata={metadata}
                hoverFeedback={!(!!grabbedEntityInfo)}

                key={entityId}
                
                onMouseEnter={getOnMouseEnterHandCard(order)}
                onMouseLeave={onMouseLeaveHandCard}/>
            })
        }
        else{
            return [];
        }
    }

    const chainDispatchReorderVerb = (err: TMaybeNull<string>, nextGameState: TGameState) => {
        const nextHand = nextGameState.hands.find(({clientId}) => clientId === ownClientId);
        if(nextHand && orderOfCardBeingHoveredWithGrabbedOne !== null){
            const {ordering} = nextHand;
            const newOrdering = [...ordering
                .slice(0, ordering.length - 1)
                .map(order => order > orderOfCardBeingHoveredWithGrabbedOne ? order + 1 : order)
                , orderOfCardBeingHoveredWithGrabbedOne + 1];
            
            dispatch(emitReorderHandVerb(newOrdering));
        }
    }
    
    const onMouseUp = (e: MouseEvent) => {
        if(grabbedEntityInfo && isOwnHand){
            const {entityId, entityType} = grabbedEntityInfo;
            
            if(entityType === EEntityTypes.CARD){
                e.stopPropagation();
                dispatch(emitPutInHandVerb(entityId, false, chainDispatchReorderVerb));
                dispatch(setGrabbedEntityInfo(null));
                setOrderOfCardBeingHoveredWithGrabbedOne(null);
            }
        }
    };

    const calculateHandCurve = useCallback(() => {
        const handElement = handRef.current;
        if(handElement){
            const {height, width} = handElement.getBoundingClientRect();
            handCurveFunctionRef.current = interpolatingPolynomial([[0, height], [width / 2, height / 2], [width, height]]);
        }
    }, [handRef]);

    useEffect(() => {
        calculateHandCurve();
        window.addEventListener("resize", calculateHandCurve);
        return () => window.removeEventListener("resize", calculateHandCurve);
    }, [calculateHandCurve]);

    return ( 
        <>
        { <div ref={handRef} onMouseUp={onMouseUp}
         className={cn("hand", {"hand--own-hand": isOwnHand}, {"hand--partner-hand": !isOwnHand})}>
        {renderCards()}
        </div>}
        </>
    )
}