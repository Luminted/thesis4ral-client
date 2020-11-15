import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { addMiddleware, removeMiddleware } from "redux-dynamic-middlewares";
import { selectGrabbedEntity, selectGrabbedEntityInfo, selectOwnClientInfo, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import {emitMoveVerb, emitReleaseVerb} from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";
import { mirrorVerbPositionMiddleware } from "../../middlewares";
import { clamp } from "../../utils";
import { setGrabbedEntityInfo } from "../../actions/setterActions/";
import { seatIdMapping } from "../../config";
import "./style.css";

const listenerThrottleValue = 1000 / 60;

export const ApplicationViewport = () => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);
    const clientInfo = useSelector(selectOwnClientInfo);
    const tablePosition = useSelector(selectTablePosition);
    const tablePixelDimensions = useSelector(selectTablePixelDimensions);
    const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

    const applicationViewportRef = useRef<HTMLDivElement>(null);

    const isMirrored = useMemo(() => {
        if(clientInfo){
            return seatIdMapping[clientInfo.seatId].includes("NORTH");
        }
        else{
            return false;
        }
    }, [clientInfo]);

    const onMouseMove = useCallback(throttle((e: MouseEvent) => {
        if(grabbedEntity && tablePosition && tablePixelDimensions && grabbedEntityInfo){
            if(grabbedEntityInfo.restricted){
                const entityLeftEdgeOffset = grabbedEntityInfo.relativeGrabbedAtX;
                const entityRightEdgeOffset = grabbedEntityInfo.width - grabbedEntityInfo.relativeGrabbedAtX;
                const entityTopEdgeOffset = grabbedEntityInfo.relativeGrabbedAtY;
                const entityBottomEdgeOffset = grabbedEntityInfo.height - grabbedEntityInfo.relativeGrabbedAtY;
                dispatch(emitMoveVerb(
                    clamp(e.clientX, tablePosition.x + entityLeftEdgeOffset, tablePosition.x + tablePixelDimensions.width - entityRightEdgeOffset),
                    clamp(e.clientY, tablePosition.y + entityTopEdgeOffset, tablePosition.y + tablePixelDimensions.height - entityBottomEdgeOffset)
                ))
            }
            else{
                dispatch(emitMoveVerb(
                    e.clientX,
                    e.clientY
                ));

            }
        }
    }, listenerThrottleValue), [grabbedEntity]);

    const onMouseUp = useCallback(throttle(() => {
        if(grabbedEntity){
            dispatch(emitReleaseVerb(
                grabbedEntity.entityId,
                grabbedEntity.entityType
            ));
            dispatch(setGrabbedEntityInfo(null));
        }
    }, listenerThrottleValue), [grabbedEntity]);

    // mirror table if client is sitting on the northern side
    useLayoutEffect(() => {
        if(isMirrored){
            addMiddleware(mirrorVerbPositionMiddleware);
        }
        return () => removeMiddleware(mirrorVerbPositionMiddleware);
    }, [isMirrored])

    useEffect(() => {
        applicationViewportRef.current?.addEventListener("mousemove", onMouseMove);
        return () => applicationViewportRef.current?.removeEventListener("mousemove", onMouseMove);
    }, [onMouseMove]);

    useEffect(() => {
        applicationViewportRef.current?.addEventListener("mouseup", onMouseUp);
        return () => applicationViewportRef.current?.removeEventListener("mouseup", onMouseUp);
    }, [onMouseUp]);

    return (
        <>
        <div ref={applicationViewportRef} className="application-viewport">
            <div className="application-viewport__center">
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? "SOUTH" : "NORTH"} />
                <CardTable isMirrored={isMirrored}/>
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? "NORTH" : "SOUTH"} />
            </div>
        </div>
        </>
    )
}