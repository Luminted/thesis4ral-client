import React, { useEffect, useState } from "react";
import { localStoragePersistedHelpFlagName } from "../../config";
import { style } from "./style";

export const Help = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const serializedPopupHelpFlag = localStorage.getItem(localStoragePersistedHelpFlagName);
      if (serializedPopupHelpFlag === null) {
        setOpen(true);
        localStorage.setItem(localStoragePersistedHelpFlagName, "true");
      } else {
        const popupHelp = JSON.parse(serializedPopupHelpFlag);
        if (!popupHelp) {
          setOpen(true);
          localStorage.setItem(localStoragePersistedHelpFlagName, "true");
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <>
      <div onClick={() => setOpen(true)} className="help-icon">
        <i className="far fa-question-circle" />
      </div>
      {isOpen && (
        <div className="help">
          <div className="help__panel">
            <div className="help__close" onClick={() => setOpen(false)}>
              <i className="far fa-times-circle" />
            </div>
            <div className="help__title">
              <h2>Instructions</h2>
            </div>
            <h3>Creating a deck</h3>
            <p>Click and drad a deck from the tray to the table</p>
            <h3>Drawing cards</h3>
            <p>Click a deck on the table to reveal a card face up.</p>
            Hold down shift while clicking and dragging on a deck to grab a card face down
            <h3>Drawing a card from other player</h3>
            <p> Cards can be drawn from other players the same way you can draw from your own.</p>
            <h3>Moving cards/decks</h3>
            <p> Click and drag cards and decks to move them around</p>
            <h3>Placing card in hand</h3>
            <p>
              {" "}
              To place a card in your hand, drag it over to the area above your name and release it. If you release the card over one that is already in your hand, then it will be
              placed as the next one in your hand.
            </p>
            <h3>Removing cards/decks</h3>
            <p>
              {" "}
              To remove a card/deck, drag it to the red area with the
              <i className="fas fa-trash" />
              icon.
            </p>
            <h3>Rotating</h3>
            <p> Cards and decks can be rotated by right clicking.</p>
            <h3>Flipping cards</h3>
            <p> Left clicking on cards flips them</p>
            <h3>Shuffling decks</h3>
            <p>
              {" "}
              Hoven over deck and click on the <i className="fas fa-random" /> icon to shuffle it.
            </p>
            <h3>Resetting card</h3>
            <p>
              {" "}
              Hover over deck and click on the <i className="fas fa-redo" /> icon to reset deck. This will also restore the original order of cards in the deck.
            </p>
            <h3>Kicking player</h3>
            <p> Disconnected players can be kicked. Their cards will be placed on the table face down.</p>
          </div>
        </div>
      )}
      <style jsx={true}>{style}</style>
    </>
  );
};
