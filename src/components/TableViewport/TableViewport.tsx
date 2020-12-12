import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";
// @ts-ignore
import { addMiddleware, removeMiddleware } from "redux-dynamic-middlewares";
import { selectGrabbedEntityInfo, selectOwnClientInfo, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import { emitMoveToVerb, emitMoveVerb, emitPutInHandVerb, emitReleaseVerb, setGrabbedEntityInfo, setIsMirrored } from "../../actions";
import { CardTable } from "../CardTable/CardTable";
import { SeatsContainer } from "../SeatsContainer/SeatsContainer";
import { mirrorVerbPositionMiddleware } from "../../middlewares";
import { clamp } from "../../utils";
import { seatIdMapping, trayWidthPercentage } from "../../config";
import "./style.css";
import { EEntityTypes, EOrientation } from "../../typings";

const listenerThrottleValue = 1000 / 60;

const getClampBorders = (
  entityWidth: number,
  entityHeight: number,
  relativeGrabbedAtX: number,
  relativeGrabbedAtY: number,
  tableWidth: number,
  tableHeight: number,
  tablePositionX: number,
  tablePositionY: number,
  isMirrored: boolean,
  trayWidthInPercentage: number,
) => {
  const entityRightEdgeOffset = entityWidth - relativeGrabbedAtX;
  const entityBottomEdgeOffset = entityHeight - relativeGrabbedAtY;
  const tableTrayWidth = tableWidth * (trayWidthInPercentage / 100);

  const leftClampBorder = tablePositionX + relativeGrabbedAtX - (isMirrored ? 0 : tableTrayWidth);

  const rightClampBorder = tablePositionX + tableWidth - entityRightEdgeOffset + (isMirrored ? tableTrayWidth : 0);

  const topClampBorder = tablePositionY + relativeGrabbedAtY;

  const bottomClampBorder = tablePositionY + tableHeight - entityBottomEdgeOffset;

  return [topClampBorder, rightClampBorder, bottomClampBorder, leftClampBorder];
};

export const TableViewport = () => {
  const dispatch = useDispatch();

  const clientInfo = useSelector(selectOwnClientInfo);
  const tablePosition = useSelector(selectTablePosition);
  const tablePixelDimensions = useSelector(selectTablePixelDimensions);
  const grabbedEntityInfo = useSelector(selectGrabbedEntityInfo);

  const tableViewportRef = useRef<HTMLDivElement>(null);

  const isMirrored = clientInfo ? seatIdMapping[clientInfo.seatId].includes("NORTH") : false;

  const onMouseMove = useCallback((e: MouseEvent) => {
      if (tablePosition && tablePixelDimensions && grabbedEntityInfo && grabbedEntityInfo.width && grabbedEntityInfo.height) {
        const {clientX, clientY} = e;
        if (grabbedEntityInfo.restricted) {
          const { width, height, relativeGrabbedAtX, relativeGrabbedAtY } = grabbedEntityInfo;
          const [topClampBorder, rightClampBorder, bottomClampBorder, leftClampBorder] = getClampBorders(
            width,
            height,
            relativeGrabbedAtX,
            relativeGrabbedAtY,
            tablePixelDimensions.width,
            tablePixelDimensions.height,
            tablePosition.x,
            tablePosition.y,
            isMirrored,
            trayWidthPercentage,
          );
          dispatch(emitMoveVerb(clamp(clientX, leftClampBorder, rightClampBorder), clamp(clientY, topClampBorder, bottomClampBorder)));
        } else {
          dispatch(emitMoveVerb(clientX, clientY));
        }
      }
    }, [grabbedEntityInfo, tablePosition, isMirrored, tablePixelDimensions, dispatch]);

  const throttledOnMouseMove = useMemo(() => throttle(onMouseMove, listenerThrottleValue), [onMouseMove]);

  const onMouseUp = () => {
    if (grabbedEntityInfo) {
      console.log("release");
      const { grabbedFromHand, originalPositionX, originalPositionY } = grabbedEntityInfo;
      const { entityId, entityType } = grabbedEntityInfo;

      if (grabbedFromHand) {
        dispatch(emitPutInHandVerb(entityId, grabbedFromHand, true));
      } else if (originalPositionX && originalPositionY && entityType === EEntityTypes.CARD) {
        dispatch(emitMoveToVerb(entityId, entityType, originalPositionX, originalPositionY));
        dispatch(emitReleaseVerb(entityId, entityType));
      } else {
        dispatch(emitReleaseVerb(entityId, entityType));
      }
      dispatch(setGrabbedEntityInfo(null));
    }
  };

  useLayoutEffect(() => {
    dispatch(setIsMirrored(isMirrored));
    if (isMirrored) {
      addMiddleware(mirrorVerbPositionMiddleware);
    }
    return () => removeMiddleware(mirrorVerbPositionMiddleware);
  }, [isMirrored, dispatch]);

  // Reacts event pooling makes this event choppy
  useEffect(() => {
    const tableViewport = tableViewportRef.current;
    tableViewport?.addEventListener("mousemove", throttledOnMouseMove);
    return () => tableViewport?.removeEventListener("mousemove", throttledOnMouseMove);
  }, [throttledOnMouseMove]);

  return (
    <div ref={tableViewportRef} onMouseUp={onMouseUp} className="table-viewport">
      <div className="table-viewport__center">
        <SeatsContainer orientation={isMirrored ? EOrientation.SOUTH : EOrientation.NORTH} />
        <CardTable />
        <SeatsContainer orientation={isMirrored ? EOrientation.NORTH : EOrientation.SOUTH} />
      </div>
    </div>
  );
};
