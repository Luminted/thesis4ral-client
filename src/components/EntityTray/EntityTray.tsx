import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitAddDeckVerb, emitGrabVerb, emitRemoveVerb, setGrabbedEntityInfo } from "../../actions";
import { frenchCardConfig, getDeckCardsMetadata} from "../../entities";
import { selectGrabbedEntityInfo, selectIsMirrored } from "../../selectors";
import { EntityCore } from "../EntityCore";
import {trayDecks} from "../../config";
import { IEntityMetadata, TGameState, ECardTypes, TMaybeNull } from "../../typings";
import "./style.css";

export const EntityTray = () => {
    const dispatch = useDispatch();

    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);
    const isMirrored = useSelector(selectIsMirrored);

    const removeEntity = (e: MouseEvent) => {
        if(grabbedEntityInfo){
            e.stopPropagation();
            
            const {entityType, entityId} = grabbedEntityInfo;
            dispatch(emitRemoveVerb(entityId, entityType));
            dispatch(setGrabbedEntityInfo(null));
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

        const ackFunction = (err: TMaybeNull<string>, nextGameState: TGameState) => {
            const {decks} = nextGameState;
            const addedDeck = decks.pop();
            if(addedDeck){
                const {entityId, entityType} = addedDeck;
                const relativeGrabbedAtX = clientX - left;
                const relativeGrabbedAtY = clientY - top;
                dispatch(emitGrabVerb(entityId, entityType, clientX, clientY));
                dispatch(setGrabbedEntityInfo({
                    entityId,
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
                <div className="entity-tray__entity">
                    <EntityCore width={width} height={height} graphicEndpoint={graphicEndpoint} eventHandlerMapping={{
                        onDragStart: getDeckOnDragStart(index)
                    }} />
                </div>
            )
        }
    })

    return <div className="entity-tray">
        <div className="entity-tray__content">
            <div className="entity-tray__segment">
                {renderedDecks}
            </div>
            <div className="entity-tray__segment">
                <div className="remove-entity-zone" onMouseUp={removeEntity}>
                    <div>
                        REMOVE
                    </div>
                </div>
            </div>
        </div>
    </div>

}