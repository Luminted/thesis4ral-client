import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import { selectCards, selectDecks } from "../../selectors";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import { DeckEntity } from "../DeckEntity";
import { setTablePosition } from "../../actions";
import { IProps } from "./typings";
import { setHorizontalScalingRatio, setTablePixelDimensions, setVerticalScalingRatio } from "../../actions/setterActions/setterActions";
import { EntityDrawer } from "../EntityDrawer";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";

export const CardTable = ({isMirrored}: IProps) => {

    const dispatch = useDispatch();

    const tableRef = useRef<HTMLDivElement>(null);

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const cards = useSelector(selectCards);
    const decks = useSelector(selectDecks);

    const renderedCards = useMemo(() => cards.map(card => 
        <CardEntity
            isMirrored={isMirrored}
            key={card.entityId}
            {...card}
             />), [cards]);

    const renderedDecks = useMemo(() => decks.map(deck =>
        <DeckEntity
            isMirrored={isMirrored}
            entityId={deck.entityId}
            key={deck.entityId}/>
        ), [decks]);

    const storeTableDOMInfo = useCallback(() => {
        const tableElement = tableRef.current;
        if(tableElement){
            const {top, left, width, height} = tableElement.getBoundingClientRect();
            dispatch(setTablePosition(left, top));
            dispatch(setTablePixelDimensions(width, height));
            dispatch(setVerticalScalingRatio({
                numerator: height,
                divisor: tableVirtualHeight
            }));
            dispatch(setHorizontalScalingRatio({
                numerator: width,
                divisor: tableVirtualWidth
            }))
        }
    }, [tableRef])

    useLayoutEffect(() => {
        storeTableDOMInfo();
    }, [storeTableDOMInfo]);

    useEffect(() => {
        window.addEventListener("resize", storeTableDOMInfo);
        return () => window.removeEventListener("resize", storeTableDOMInfo);
    }, [])

    const toggleDrawerOpen = () => setDrawerOpen(!isDrawerOpen)

    return (
        <>
        <div className="card-table">
            <div className={cn("card-table__drawer", {"card-table__drawer--open": isDrawerOpen})}>
                <EntityDrawer onHandleClick={toggleDrawerOpen} />
            </div>
            <div ref={tableRef} className="card-table__table"> 
                {renderedCards}
                {renderedDecks}
            </div>
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}