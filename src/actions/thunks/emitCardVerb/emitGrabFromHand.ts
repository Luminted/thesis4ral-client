import { TThunkResult } from "..";
import { ECardVerbTypes, IGrabFromHandVerb } from "../../../typings";
import {socketEmitVerb} from "../../"

export const emitGrabFromHand = (entityId: string, grabbedAtX: number, grabbedAtY: number, grabbedFrom: string, positionX: number, positionY: number, faceUp: boolean): TThunkResult =>
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IGrabFromHandVerb = {
            entityId,
            grabbedAtX,
            grabbedAtY,
            grabbedFrom,
            positionX,
            positionY,
            faceUp,
            clientId: clientInfo!.clientId,
            type: ECardVerbTypes.GRAB_FROM_HAND
        }
        dispatch(socketEmitVerb(verb));
    }