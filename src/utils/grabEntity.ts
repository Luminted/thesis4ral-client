import { Dispatch } from "react";
import { emitGrabVerb, setGrabbedEntityInfo, TActionTypes, TThunkResult } from "../actions";
import { EEntityTypes } from "../typings";

export const grabEntity = (dispatch: Dispatch<TActionTypes | TThunkResult>,
    entityId: string,
    entityType: EEntityTypes,
    mousePositionX: number,
    mousePositionY: number,
    entityWidth: number,
    entityHeight: number,
    relativeMouseX: number,
    relativeMouseY: number,
    isBoundToTable: boolean,
    originalPositionX: number,
    originalPositionY: number
    ) =>{
    dispatch(emitGrabVerb(entityId, entityType, mousePositionX, mousePositionY));
    dispatch(setGrabbedEntityInfo({
        entityId,
        entityType,
        originalPositionX,
        originalPositionY,
        height: entityHeight,
        width: entityWidth,
        relativeGrabbedAtX: relativeMouseX,
        relativeGrabbedAtY: relativeMouseY,
        restricted: isBoundToTable,
    }));
}