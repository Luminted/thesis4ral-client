import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { addMiddleware, removeMiddleware } from "redux-dynamic-middlewares";
import { selectGrabbedEntity, selectOwnClientInfo } from "../../selectors";
import {emitMoveVerb, emitReleaseVerb} from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";
import { mirrorVerbPositionMiddleware } from "../../middlewares";
import "./style.css";
import { setGrabbedEntityInfo } from "../../actions/setterActions/";

const listenerThrottleValue = 1000 / 60;

export const ApplicationViewport = () => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);
    const clientInfo = useSelector(selectOwnClientInfo);

    const applicationViewportRef = useRef<HTMLDivElement>(null);

    const isMirrored = useMemo(() => clientInfo?.seatedAt.includes("NORTH") || false, [clientInfo]);

    const onMouseMove = useCallback(throttle((e: MouseEvent) => {
        if(grabbedEntity){
            dispatch(emitMoveVerb(
                e.clientX,
                e.clientY
                ));
        }
    }, listenerThrottleValue), [grabbedEntity]);

    const onMouseUp = useCallback(throttle(() => {
        if(grabbedEntity){
            dispatch(emitReleaseVerb(
                grabbedEntity.entityId,
                grabbedEntity.entityType
            ));
            dispatch(setGrabbedEntityInfo(null))
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
        {clientInfo && <div ref={applicationViewportRef} className="application-viewport">
            <div className="application-viewport__center">
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? "SOUTH" : "NORTH"} />
                <CardTable isMirrored={isMirrored}/>
                <SeatsContainer isMirrored={isMirrored} orientation={isMirrored ? "NORTH" : "SOUTH"} />
            </div>
        </div>}
        {!clientInfo && "LOADING"}
        </>
    )
}