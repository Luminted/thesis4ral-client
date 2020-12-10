import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitDrawFaceUpVerb, emitResetVerb, emitShuffleVerb } from "../../actions";
import { selectGrabbedEntityInfo } from "../../selectors";
import { EEntityTypes } from "../../typings";
import { IProps } from "./interfaces";
import {Entity} from "../Entity";
import {deckRotationStepDegree} from "../../config";
import { getCardDimensions } from "../../utils";
import "./styles.css";

export const DeckEntity = ({entityId, positionX, positionY, zIndex, rotation, grabbedBy, metadata}: IProps) => {
    
    const dispatch = useDispatch();

    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

    const isGrabbed = grabbedEntityInfo?.entityId === entityId;
    const {name, type} = metadata;
    const {height, width} = getCardDimensions(type)

    const onClick = () => {
        if(grabbedEntityInfo === null){
            dispatch(emitDrawFaceUpVerb(entityId));
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

            eventHandlers={{
                onClick
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
        </>)
}