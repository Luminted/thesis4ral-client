import { ThunkResult } from "../..";
import { CardVerbTypes, IGrabFromHandVerb } from "../../../types/verb";
import { socketEmitVerb } from "../../socketActions";

export const emitGrabFromHand = (entityId: string, grabbedAtX: number, grabbedAtY: number, grabbedFrom: string, positionX: number, positionY: number): ThunkResult =>
    (dispatch, getState) => {
        const {clientInfo} = getState();
        const verb: IGrabFromHandVerb = {
            entityId,
            grabbedAtX,
            grabbedAtY,
            grabbedFrom,
            positionX,
            positionY,
            clientId: clientInfo!.clientId,
            type: CardVerbTypes.GRAB_FROM_HAND
        }
        dispatch(socketEmitVerb(verb));
    }