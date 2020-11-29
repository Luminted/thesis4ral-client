import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import interpolatingPolynomial from "interpolating-polynomial";
import cn from "classnames";
import { emitPutInHandVerb, emitReorderHandVerb } from "../../actions";
import { selectClientId, selectGrabbedEntity } from "../../selectors";
import {IProps} from "./typings";
import { calculateAdjacentAngle, calculateDistance } from "../../utils"
import "./style.css";
import { HandCard } from "../HandCard";
import { EOrientation } from "../../types/additionalTypes";
import { setGrabbedEntityInfo } from "../../actions/setterActions";
import { EntityTypes } from "../../types/dataModelDefinitions";
import { MaybeNull } from "../../types/genericTypes";

//TODO: move to config
const cardTiltFactor = 1;

const getCardTiltAngle = (handWidth: number, handHeight: number, cardPosition: [number, number], tiltFactor: number) => {
    const [cardX, cardY] = cardPosition;
    const pivotPointX = handWidth / 2;
    const pivotPointY = -tiltFactor * handHeight;
    const adjacentSideLength = calculateDistance([pivotPointX, pivotPointY], [pivotPointX, cardY]);
    const hypotenuseLength = calculateDistance([pivotPointX, pivotPointY], [cardX, cardY]);
    const tiltAngle = calculateAdjacentAngle(adjacentSideLength, hypotenuseLength);
    return pivotPointX >= cardX ? -tiltAngle : tiltAngle;
}

export const Hand = ({isMirrored, orientation, handDetails}: IProps) => {

    const dispatch = useDispatch();

    const handRef = useRef<HTMLDivElement>(null);
    const handCurveFunctionRef = useRef<(y: number) => number>();

    const [orderOfCardBeingHoveredWithGrabbedOne, setOrderOfCardBeingHoveredWithGrabbedOne] = useState<MaybeNull<number>>(null);

    const grabbedEntity = useSelector(selectGrabbedEntity);
    const ownClientId = useSelector(selectClientId);

    const {cards, ordering, clientId} = handDetails;

    const getOnMouseEnterHandCard = orderOfCard => () => {
        if(grabbedEntity && grabbedEntity.entityType === EntityTypes.CARD){
            setOrderOfCardBeingHoveredWithGrabbedOne(orderOfCard);
        }
    }

    const onMouseLeaveHandCard = () => {
        if(grabbedEntity && grabbedEntity.entityType === EntityTypes.CARD){
            setOrderOfCardBeingHoveredWithGrabbedOne(null);
        }
    }

    const isOwnHand = useMemo(() => ownClientId === clientId, [ownClientId]);
    const renderedCards = useMemo(() => {
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
                isMirrored={isMirrored}
                faceUp={isOwnHand}
                metadata={metadata}
                hoverFeedback={!(!!grabbedEntity)}

                key={entityId}
                
                onMouseEnter={getOnMouseEnterHandCard(order)}
                onMouseLeave={onMouseLeaveHandCard}/>
            })
        }
        else{
            return [];
        }
    }, [cards ,handRef, handCurveFunctionRef.current]);
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        if(grabbedEntity && isOwnHand){
            const {entityId, entityType} = grabbedEntity;
            
            if(entityType === EntityTypes.CARD){
                e.stopPropagation();
                dispatch(emitPutInHandVerb(entityId, false,
                    // TODO: move this to separate variable
                    nextGameState => {
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
                ));
                dispatch(setGrabbedEntityInfo(null));
                setOrderOfCardBeingHoveredWithGrabbedOne(null);
            }
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