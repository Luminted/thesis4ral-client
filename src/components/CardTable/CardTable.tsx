import React, { useLayoutEffect, useMemo, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { selectCards, selectDecks } from "../../selectors";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import {ECardInteractionContext} from "../CardEntity/typings";
import { DeckEntity } from "../DeckEntity";
import { setTablePosition } from "../../actions";

export const CardTable = () => {

    const dispatch = useDispatch();

    const tableRef = useRef<HTMLDivElement>(null);

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

    useLayoutEffect(() => {
        const tableElement = tableRef.current;
        if(tableElement){
            const {top, left} = tableElement.getBoundingClientRect();
            dispatch(setTablePosition(left, top));
        }
    }, [])

    return (
        <>
        <div ref={tableRef} className="card-table">
            {renderedCards}
            {renderedDecks}
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}