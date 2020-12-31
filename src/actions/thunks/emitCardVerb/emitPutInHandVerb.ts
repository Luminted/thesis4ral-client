import { TThunkResult } from "..";
import { ECardVerbTypes, IPutInHandVerb } from "../../../typings";
import { socketEmitVerb } from "../../";
import { TSocketVerbAckFunction } from "../../socketEmitVerb";

export const emitPutInHandVerb = (entityId: string, toHandOf: string, faceUp: boolean, ackFunction?: TSocketVerbAckFunction): TThunkResult => (dispatch, getState) => {
  const { clientInfo } = getState();
  const verb: IPutInHandVerb = {
    entityId,
    faceUp,
    toHandOf,
    clientId: clientInfo?.clientId || "",
    type: ECardVerbTypes.PUT_IN_HAND,
  };
  dispatch(socketEmitVerb(verb, ackFunction));
};
