import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { selectGrabbedEntity } from "../../selectors";
import {emitSharedVerb} from "../../actions/thunks";
import { SharedVerbTypes } from "../../types/verbTypes";
import "./style.css";
import { CardTable } from "../CardTable/CardTable";

const listenerThrottleValue = 1000 / 60;

export const ApplicationViewport = () => {
    const dispatch = useDispatch();

    const grabbedEntity = useSelector(selectGrabbedEntity);

    const applicationViewportRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback(throttle((event: MouseEvent) => {
        if(grabbedEntity){
            dispatch(emitSharedVerb(
                event.clientX,
                event.clientY,
                SharedVerbTypes.MOVE,
                grabbedEntity.entityId,
                grabbedEntity.entityType));
        }
    }, listenerThrottleValue), [grabbedEntity]);

    const onMouseUp = useCallback(throttle((event: MouseEvent) => {
        if(grabbedEntity){
            dispatch(emitSharedVerb(
                event.clientX,
                event.clientY,
                SharedVerbTypes.RELEASE,
                grabbedEntity.entityId,
                grabbedEntity.entityType));
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
        <div ref={applicationViewportRef} className="application-viewport">
            <CardTable/>
        </div>
    )
}