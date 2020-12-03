import React, { MouseEvent, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import { selectCards, selectDecks, selectGrabbedEntityInfo } from "../../selectors";
import { CardEntity } from "../CardEntity";
import {style} from "./style";
import { DeckEntity } from "../DeckEntity";
import { IProps } from "./typings";
import { setGrabbedEntityInfo, setHorizontalScalingRatio, setTablePixelDimensions, setVerticalScalingRatio, emitReleaseVerb, setTablePosition } from "../../actions";
import { EntityTray } from "../EntityTray";
import { tableVirtualHeight, tableVirtualWidth } from "../../config";

export const CardTable = ({isMirrored}: IProps) => {

    const dispatch = useDispatch();

    const tableRef = useRef<HTMLDivElement>(null);

    const cards = useSelector(selectCards);
    const decks = useSelector(selectDecks);
    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

    const onMouseUp = (e: MouseEvent) => {
        e.stopPropagation();

        if(grabbedEntityInfo){
            const {entityId, entityType} = grabbedEntityInfo;

            dispatch(emitReleaseVerb(entityId, entityType));
            dispatch(setGrabbedEntityInfo(null));
        }
    }

    const renderedCards = cards.map(card => 
        <CardEntity
            key={card.entityId}
            {...card}
             />);

    const renderedDecks = decks.map(deck =>
        <DeckEntity
            key={deck.entityId}
            {...deck}
            />);

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
    }, [tableRef]);

    useLayoutEffect(() => {
        storeTableDOMInfo();
    }, [storeTableDOMInfo]);

    useEffect(() => {
        window.addEventListener("resize", storeTableDOMInfo);
        return () => window.removeEventListener("resize", storeTableDOMInfo);
    }, [])

    return (
        <>
        <div className={cn("card-table", {"card-table--mirrored": isMirrored})}>
            <div className="card-table__drawer">
                <EntityTray isMirrored={isMirrored} />
            </div>
            <div ref={tableRef} className="card-table__table" onMouseUp={onMouseUp}> 
                {renderedCards}
                {renderedDecks}
            </div>
        </div>
        <style jsx={true}>{style}</style>
        </>
    )
}