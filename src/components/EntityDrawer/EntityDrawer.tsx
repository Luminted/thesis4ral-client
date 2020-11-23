import React, { DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitAddDeckVerb, emitGrabVerb, emitRemoveVerb } from "../../actions";
import { frenchCardConfig, getDeckCardsMetadata} from "../../entities";
import {ECardTypes} from "../../types/entityTypings";
import { selectGrabbedEntity } from "../../selectors";
import { EntityCore } from "../EntityCore";
import "./style.css";
import { IProps } from "./typing";
import {drawerDecks} from "../../config";
import { IEntityMetadata, SerializedGameState } from "../../types/dataModelDefinitions";
import { setGrabbedEntityInfo } from "../../actions/setterActions";

export const EntityDrawer = ({onHandleClick}: IProps) => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const removeEntity = () => {
        if(grabbedEntity){
            const {entityType, entityId} = grabbedEntity;
            dispatch(emitRemoveVerb(entityId, entityType));
        }
    }

    const getDeckOnDragStart = (deckIndex: number) => (e: DragEvent) =>{
        e.preventDefault();

        const {cards, type, cardBack} = drawerDecks[deckIndex];
        const {left, right, top, bottom, width, height} = e.currentTarget.getBoundingClientRect();
        const {clientX, clientY} = e;
        const metadata: IEntityMetadata = {
            type,
            name: cardBack
        }
        const cardsMetadata = getDeckCardsMetadata(cards, cardBack);

        const ackFunction = (nextGameState: SerializedGameState) => {
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

        console.log(left, top, "~~~~~")
        dispatch(emitAddDeckVerb(cardsMetadata, metadata, left, top, 0, ackFunction));
    }

    const renderedDecks = drawerDecks.map(({cardBack, type}, index) => {
        if(type === ECardTypes.FRENCH){
            const {height, width} = frenchCardConfig;
            const graphicEndpoint = `${type}/${cardBack}`

            return <EntityCore width={width} height={height} graphicEndpoint={graphicEndpoint} eventHandlerMapping={{
                onDragStart: getDeckOnDragStart(index)
            }} />
        }
    })

    return <div className="entity-drawer">
        <div className="entity-drawer__handle" onClick={onHandleClick} />
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