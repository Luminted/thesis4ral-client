import React, { useMemo } from "react";
import { selectCards, selectDecks } from "../../selectors";
import { useTypedSelector } from "../../store";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import {CardContext} from "../CardEntity/typings";
import { DeckEntity } from "../DeckEntity";

export const CardTable = () => {

    const cards = useTypedSelector(selectCards);
    const decks = useTypedSelector(selectDecks);

    const renderedCards = useMemo(() => cards.map(card => 
        <CardEntity 
            context={CardContext.TABLE}
            entityId={card.entityId}
            key={card.entityId}
             />), [cards]);

    const renderedDecks = useMemo(() => decks.map(deck =>
        <DeckEntity 
            entityId={deck.entityId}
            key={deck.entityId}/>
        ), [decks]);

    return (
        <>
        <div className="card-table">
            {renderedCards}
            {renderedDecks}
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}