import React, { DragEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emitAddDeckVerb, emitGrabVerb, emitRemoveVerb, setGrabbedEntityInfo } from "../../actions";
import { selectGrabbedEntityInfo, selectIsMirrored } from "../../selectors";
import { trayDecks } from "../../config";
import { IEntityMetadata, TGameState, ECardTypes, TMaybeNull, ICardEntityMetadata } from "../../typings";
import { style } from "./style";
import { EntityTrayDeck } from "../EntityTrayDeck/EntityTrayDeck";
import { getCardHeight } from "../../utils";

export const EntityTray = () => {
  const dispatch = useDispatch();

  const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);
  const isMirrored = useSelector(selectIsMirrored);

  const removeEntity = (e: MouseEvent) => {
    if (grabbedEntityInfo) {
      e.stopPropagation();

      const { entityType, entityId } = grabbedEntityInfo;
      dispatch(emitRemoveVerb(entityId, entityType));
      dispatch(setGrabbedEntityInfo(null));
    }
  };

  const getDeckOnDragStart = (deckIndex: number) => (e: DragEvent) => {
    e.preventDefault();

    const { cards, type, cardBack } = trayDecks[deckIndex];
    const { left, right, top, bottom, width, height } = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    const metadata: IEntityMetadata = {
      type,
      name: cardBack,
    };
    const cardsMetadata: ICardEntityMetadata[] = cards.map((card) => ({
      ...card,
      back: cardBack,
    }));

    const ackFunction = (err: TMaybeNull<string>, nextGameState: TGameState) => {
      if (!err) {
        const { decks } = nextGameState;
        const addedDeck = decks.pop();
        if (addedDeck) {
          const { entityId, entityType } = addedDeck;
          const relativeGrabbedAtX = clientX - left;
          const relativeGrabbedAtY = clientY - top;
          dispatch(emitGrabVerb(entityId, entityType, clientX, clientY));
          dispatch(
            setGrabbedEntityInfo({
              entityId,
              entityType,
              height,
              width,
              relativeGrabbedAtX,
              relativeGrabbedAtY,
              restricted: true,
            }),
          );
        }
      }
    };

    dispatch(emitAddDeckVerb(cardsMetadata, metadata, isMirrored ? right : left, isMirrored ? bottom : top, 0, ackFunction));
  };

  const renderedDecks = trayDecks.map(({ cardBack, type, preview }, index) => {
    if (type === ECardTypes.FRENCH) {
      const baseHeight = getCardHeight(type);
      const deckGraphicEndpoint = `${type}/${cardBack}`;
      const previewGraphicEndpoint = `${type}/${preview}`;

      return (
        <div key={index} className="entity-tray__entity">
          <EntityTrayDeck onDragStart={getDeckOnDragStart(index)} height={baseHeight} previewGraphicEndpoint={previewGraphicEndpoint} deckGraphicEndpoint={deckGraphicEndpoint} />
        </div>
      );
    }

    return null;
  });

  return (
    <>
      <div className="entity-tray">
        <div className="entity-tray__content">
          <div className="entity-tray__segment">{renderedDecks}</div>
          <div className="entity-tray__segment">
            <div className="remove-entity-zone" onMouseUp={removeEntity}>
              <div className="remove-entity-zone__icon">
                <i className="fas fa-trash" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx={true}>{style}</style>
    </>
  );
};
