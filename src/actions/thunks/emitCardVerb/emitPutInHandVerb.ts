import { TThunkResult } from "..";
import { ECardVerbTypes, IPutInHandVerb } from "../../../typings";
import { socketEmitVerb } from "../../";
import { TSocketVerbAckFunction } from "../../socketEmitVerb";

export const emitPutInHandVerb = (entityId: string, putInHandOf: string, faceUp: boolean, ackFunction?: TSocketVerbAckFunction): TThunkResult => (dispatch) => {
  const verb: IPutInHandVerb = {
    entityId,
    faceUp,
    clientId: putInHandOf,
    type: ECardVerbTypes.PUT_IN_HAND,
  };
  dispatch(socketEmitVerb(verb, ackFunction));
};
