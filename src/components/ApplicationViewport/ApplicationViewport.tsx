import React, { MouseEvent as ReactMouseEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {throttle} from "lodash";
import { addMiddleware, removeMiddleware } from "redux-dynamic-middlewares";
import { selectGrabbedEntity, selectGrabbedEntityInfo, selectOwnClientInfo, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import {emitMoveToVerb, emitMoveVerb, emitPutInHandVerb, emitReleaseVerb} from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";
import { mirrorVerbPositionMiddleware } from "../../middlewares";
import { clamp } from "../../utils";
import { setGrabbedEntityInfo } from "../../actions/setterActions/";
import { seatIdMapping, trayWidthPercentage } from "../../config";
import "./style.css";
import { EOrientation } from "../../types/additionalTypes";
import { EntityTypes } from "../../types/dataModelDefinitions";

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
            if(grabbedEntity.entityType === EntityTypes.DECK){
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
    }, listenerThrottleValue), [grabbedEntity]);

    const onMouseUp = useCallback(throttle((e: ReactMouseEvent) => {
        if(grabbedEntity && grabbedEntityInfo){
            const {grabbedFromHand, originalPositionX, originalPositionY} = grabbedEntityInfo;
            const {entityId, entityType} = grabbedEntity;

            if(grabbedFromHand){
                dispatch(emitPutInHandVerb(entityId, true));
            }
            else if(originalPositionX && originalPositionY && entityType === EntityTypes.CARD){
                dispatch(emitMoveToVerb(entityId, entityType, originalPositionX, originalPositionY));
                dispatch(emitReleaseVerb(
                    grabbedEntity.entityId,
                    grabbedEntity.entityType
                ));
            }
            else{
                dispatch(emitReleaseVerb(
                    grabbedEntity.entityId,
                    grabbedEntity.entityType
                ));
            }

            
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