import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitAddDeckVerb, emitGrabVerb, emitRemoveVerb, setGrabbedEntityInfo } from "../../actions";
import { frenchCardConfig, getDeckCardsMetadata} from "../../entities";
import { selectGrabbedEntity } from "../../selectors";
import { EntityCore } from "../EntityCore";
import {trayDecks} from "../../config";
import { IEntityMetadata, TSerializedGameState, ECardTypes } from "../../typings";
import { IProps } from "./typings";
import "./style.css";

export const EntityTray = ({isMirrored}: IProps) => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const removeEntity = (e: MouseEvent) => {
        if(grabbedEntity){
            e.stopPropagation();
            
            const {entityType, entityId} = grabbedEntity;
            dispatch(emitRemoveVerb(entityId, entityType));
        }
    }

    const getDeckOnDragStart = (deckIndex: number) => (e: DragEvent) =>{
        e.preventDefault();

        const {cards, type, cardBack} = trayDecks[deckIndex];
        const {left, right, top, bottom, width, height} = e.currentTarget.getBoundingClientRect();
        const {clientX, clientY} = e;
        const metadata: IEntityMetadata = {
            type,
            name: cardBack
        }
        const cardsMetadata = getDeckCardsMetadata(cards, cardBack);

        const ackFunction = (nextGameState: TSerializedGameState) => {
            const {decks} = nextGameState;
            const addedDeck = decks.pop();
            if(addedDeck){
                const {entityId, entityType} = addedDeck;
                const relativeGrabbedAtX = clientX - left;
                const relativeGrabbedAtY = clientY - top;
                dispatch(emitGrabVerb(entityId, entityType, clientX, clientY));
                dispatch(setGrabbedEntityInfo({
                    entityType,
                    height,
                    width,
                    relativeGrabbedAtX,
                    relativeGrabbedAtY,
                    restricted: true
                }))
                
            }
        }

        dispatch(emitAddDeckVerb(cardsMetadata, metadata, (isMirrored ? right : left), (isMirrored ? bottom : top), 0, ackFunction));
    }

    const renderedDecks = trayDecks.map(({cardBack, type}, index) => {
        if(type === ECardTypes.FRENCH){
            const {height, width} = frenchCardConfig;
            const graphicEndpoint = `${type}/${cardBack}`

            return (
                <div className="entity-drawer__deck">
                    <EntityCore width={width} height={height} graphicEndpoint={graphicEndpoint} eventHandlerMapping={{
                        onDragStart: getDeckOnDragStart(index)
                    }} />
                </div>
            )
        }
    })

    return <div className="entity-drawer">
        <div className="entity-drawer__content">
            <div className="entity-drawer__segment">
                {renderedDecks}
            </div>
            <div className="entity-drawer__segment">
                <div className="remove-entity-zone" onMouseUp={removeEntity}>
                    <div>
                        REMOVE
                    </div>
                </div>
            </div>
        </div>
    </div>

}