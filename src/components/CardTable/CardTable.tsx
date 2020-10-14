import React, { useMemo } from "react";
import {useSelector} from "react-redux";
import { selectCards, selectDecks } from "../../selectors";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import {ECardInteractionContext} from "../CardEntity/typings";
import { DeckEntity } from "../DeckEntity";

export const CardTable = () => {

    const cards = useSelector(selectCards);
    const decks = useSelector(selectDecks);

    const renderedCards = useMemo(() => cards.map(card => 
        <CardEntity 
            context={ECardInteractionContext.TABLE}
            key={card.entityId}
            {...card}
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