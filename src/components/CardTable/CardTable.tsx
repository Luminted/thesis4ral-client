import React, { useMemo } from "react";
import { selectCards } from "../../selectors";
import { useTypedSelector } from "../../store";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import {CardContext} from "../CardEntity/typings";

export const CardTable = () => {

    const cards = useTypedSelector(selectCards);

    const renderedCards = useMemo(() =>  cards.map(card => 
        <CardEntity 
            context={CardContext.TABLE}
            entityId={card.entityId}
            key={card.entityId}
             />), [cards]);

    return (
        <>
        <div className="card-table">
            {renderedCards}
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}