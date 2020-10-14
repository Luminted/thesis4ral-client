import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { selectGrabbedEntity, selectOwnClientInfo } from "../../selectors";
import {emitMoveVerb, emitReleaseVerb} from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import "./style.css";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";

const listenerThrottleValue = 1000 / 60;

export const ApplicationViewport = () => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);
    const clientInfo = useSelector(selectOwnClientInfo);

    const applicationViewportRef = useRef<HTMLDivElement>(null);

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
        }
    }, listenerThrottleValue), [grabbedEntity]);

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
                    <SeatsContainer orientation={"NORTH"} />
                    <CardTable/>
                    <SeatsContainer orientation={"SOUTH"} />
            </div>
        </div>}
        {!clientInfo && "LOADING"}
        </>
    )
}