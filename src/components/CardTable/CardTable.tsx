import React, { useLayoutEffect, useMemo, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { selectCards, selectDecks } from "../../selectors";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import {ECardInteractionContext} from "../CardEntity/typings";
import { DeckEntity } from "../DeckEntity";
import { setTablePosition } from "../../actions";
import { IProps } from "./typings";
import { setTablePixelDimensions } from "../../actions/setterActions";

export const CardTable = ({isMirrored}: IProps) => {

    const dispatch = useDispatch();

    const tableRef = useRef<HTMLDivElement>(null);

    const cards = useSelector(selectCards);
    const decks = useSelector(selectDecks);

    const renderedCards = useMemo(() => cards.map(card => 
        <CardEntity
            isMirrored={isMirrored}
            context={ECardInteractionContext.TABLE}
            key={card.entityId}
            {...card}
             />), [cards]);

    const renderedDecks = useMemo(() => decks.map(deck =>
        <DeckEntity
            isMirrored={isMirrored}
            entityId={deck.entityId}
            key={deck.entityId}/>
        ), [decks]);

    useLayoutEffect(() => {
        const tableElement = tableRef.current;
        if(tableElement){
            const {top, left, width, height} = tableElement.getBoundingClientRect();
            dispatch(setTablePosition(left, top));
            dispatch(setTablePixelDimensions(width, height));
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