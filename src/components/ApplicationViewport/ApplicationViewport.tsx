import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { addMiddleware, removeMiddleware } from "redux-dynamic-middlewares";
import { selectGrabbedEntityInfo, selectOwnClientInfo, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import {emitMoveToVerb, emitMoveVerb, emitPutInHandVerb, emitReleaseVerb, setGrabbedEntityInfo} from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";
import { mirrorVerbPositionMiddleware } from "../../middlewares";
import { clamp } from "../../utils";
import { seatIdMapping, trayWidthPercentage } from "../../config";
import "./style.css";
import { EEntityTypes, EOrientation } from "../../typings";

const listenerThrottleValue = 1000 / 60;

export const ApplicationViewport = () => {
    const dispatch = useDispatch();

    const clientInfo = useSelector(selectOwnClientInfo);
    const tablePosition = useSelector(selectTablePosition);
    const tablePixelDimensions = useSelector(selectTablePixelDimensions);
    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

    const applicationViewportRef = useRef<HTMLDivElement>(null);

    const isMirrored = clientInfo ? seatIdMapping[clientInfo.seatId].includes("NORTH") : false;

    const onMouseMove = useCallback(throttle((e: MouseEvent) => {
        if(tablePosition && tablePixelDimensions && grabbedEntityInfo){
            if(grabbedEntityInfo.entityType === EEntityTypes.DECK){
                const entityLeftEdgeOffset = grabbedEntityInfo.relativeGrabbedAtX;
                const entityRightEdgeOffset = grabbedEntityInfo.width - grabbedEntityInfo.relativeGrabbedAtX;
                const entityTopEdgeOffset = grabbedEntityInfo.relativeGrabbedAtY;
                const entityBottomEdgeOffset = grabbedEntityInfo.height - grabbedEntityInfo.relativeGrabbedAtY;
                const tableTrayWidth = tablePixelDimensions.width * (trayWidthPercentage / 100);
                const leftClampBorder = tablePosition.x + entityLeftEdgeOffset - (isMirrored ? 0 : tableTrayWidth);
                const rightClampBorder = tablePosition.x + tablePixelDimensions.width - entityRightEdgeOffset + (isMirrored ? tableTrayWidth : 0);
                const topClampBorder = tablePosition.y + entityTopEdgeOffset;
                const bottomClampBorder = tablePosition.y + tablePixelDimensions.height - entityBottomEdgeOffset;
                dispatch(emitMoveVerb(
                    clamp(e.clientX, leftClampBorder, rightClampBorder),
                    clamp(e.clientY, topClampBorder, bottomClampBorder)
                ))
            }
            else{
                dispatch(emitMoveVerb(
                    e.clientX,
                    e.clientY
                ));

            }
        }
    }, listenerThrottleValue), [grabbedEntityInfo]);

    const onMouseUp = () => {
        if(grabbedEntityInfo && grabbedEntityInfo){
            const {grabbedFromHand, originalPositionX, originalPositionY} = grabbedEntityInfo;
            const {entityId, entityType} = grabbedEntityInfo;

            if(grabbedFromHand){
                dispatch(emitPutInHandVerb(entityId, true));
            }
            else if(originalPositionX && originalPositionY && entityType === EEntityTypes.CARD){
                dispatch(emitMoveToVerb(entityId, entityType, originalPositionX, originalPositionY));
                dispatch(emitReleaseVerb(
                   entityId,
                   entityType
                ));
            }
            else{
                dispatch(emitReleaseVerb(
                   entityId,
                   entityType
                ));
            }
            dispatch(setGrabbedEntityInfo(null));
        }
    }

    // mirror table if client is sitting on the northern side
    useLayoutEffect(() => {
        if(isMirrored){
            addMiddleware(mirrorVerbPositionMiddleware);
        }
        return () => removeMiddleware(mirrorVerbPositionMiddleware);
    }, [isMirrored])

    // Reacts event pooling makes this event choppy
    useEffect(() => {
        applicationViewportRef.current?.addEventListener("mousemove", onMouseMove);
        return () => applicationViewportRef.current?.removeEventListener("mousemove", onMouseMove);
    }, [onMouseMove]);
    
    return (
        <>
        <div ref={applicationViewportRef} onMouseUp={onMouseUp} className="application-viewport">
            <div className="application-viewport__center">
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? EOrientation.SOUTH : EOrientation.NORTH} />
                <CardTable isMirrored={isMirrored}/>
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? EOrientation.NORTH : EOrientation.SOUTH} />
            </div>
        </div>
        </>
    )
}