import React, {DragEvent} from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceDownVerb, emitDrawFaceUpVerb, emitGrabVerb, emitResetVerb, emitShuffleVerb, setGrabbedEntityInfo } from "../../actions";
import { selectGrabbedEntityInfo, selectIsMirrored } from "../../selectors";
import { EEntityTypes, TGameState, TMaybeNull } from "../../typings";
import { IProps } from "./interfaces";
import {Entity} from "../Entity";
import {deckRotationStepDegree} from "../../config";
import { getCardDimensions } from "../../utils";
import {styles} from "./styles";
import { grabEntity } from "../../utils/grabEntity";

export const DeckEntity = ({entityId, positionX, positionY, zIndex, rotation, grabbedBy, metadata}: IProps) => {
    
    const dispatch = useDispatch();

    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);
    const isMirrored = useSelector(selectIsMirrored);

    const isGrabbed = grabbedEntityInfo?.entityId === entityId;
    const {name, type} = metadata;
    const {height, width} = getCardDimensions(type);

    const getDrawFaceUpAckFunction = (
        mouseX: number,
        mouseY: number,
        relativeGrabbedAtX: number,
        relativeGrabbedAtY: number,
        originalPositionX: number,
        originalPositionY: number) =>
            (err: TMaybeNull<string>, nextGameState: TGameState, drawnCardId: string) => {
                if(!err){
                    const {cards} = nextGameState;
                    const drawnCard = cards.find(card => card.entityId === drawnCardId);
                    if(drawnCard){
                        const {entityType} = drawnCard; 
                        dispatch(emitGrabVerb(drawnCardId, entityType, mouseX, mouseY));
                        dispatch(setGrabbedEntityInfo({
                            entityId: drawnCardId,
                            restricted: false,
                            entityType,
                            width,
                            height,
                            relativeGrabbedAtX,
                            relativeGrabbedAtY,
                            originalPositionX,
                            originalPositionY
                        }))
                    }
                }
        }

    const onClick = () => {
        if(grabbedEntityInfo === null){
            dispatch(emitDrawFaceUpVerb(entityId));
        }
    }
    const onDragStart = (e: DragEvent) => {
        e.preventDefault();
        const {clientX, clientY, shiftKey} = e;
        const {width, height, top, left, right, bottom} = e.currentTarget.getBoundingClientRect();
        const relativeMouseX = clientX - left;
        const relativeMouseY = clientY - top;
        const originalPositionX = isMirrored ? right : left;
        const originalPositionY = isMirrored ? bottom : top;
        const ackFunction = getDrawFaceUpAckFunction(clientX, clientY, relativeMouseX, relativeMouseY, originalPositionX, originalPositionY);

        if(shiftKey){
            dispatch(emitDrawFaceDownVerb(entityId, ackFunction));
        }
        else{
            grabEntity(dispatch, entityId, EEntityTypes.DECK, clientX, clientY, width, height, relativeMouseX, relativeMouseY, false, originalPositionX, originalPositionY);
        }
    }

    const onShuffle = () => dispatch(emitShuffleVerb(entityId));

    const onReset =() => dispatch(emitResetVerb(entityId));
    return (
        <>
       <Entity 
            entityId={entityId} 
            entityType={EEntityTypes.DECK} 
            clickPassThrough={isGrabbed} 
            positionX={positionX}
            positionY={positionY}
            width={width}
            height={height}
            zIndex={zIndex}
            rotation={rotation}
            rotationStep={deckRotationStepDegree}
            boundToTable={true}
            grabbedBy={grabbedBy}
            svgEndpoint={`${type}/${name}`}
            entityCoreClassnames={["deck-entity-illusion"]}

            eventHandlers={{
                onClick,
                onDragStart
            }}
            menuContent={
                <>
                <div onClick={onShuffle} className="menu_button">
                    <i className="fas fa-random"></i>
                </div>
                <div onClick={onReset} className="menu_button">
                    <i className="fas fa-redo"></i>
                </div>
                </>}
            />
            <style jsx={true}>{styles}</style>
        </>)
}