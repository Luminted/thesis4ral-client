import { TThunkResult } from "..";
import { IReleaseVerb, ESharedVerbTypes, EEntityTypes } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitReleaseVerb = (entityId: string, entityType: EEntityTypes): TThunkResult => (dispatch, getState) => {
  const { clientInfo } = getState();
  const verb: IReleaseVerb = {
    entityId,
    entityType,
    clientId: clientInfo?.clientId || "",
    type: ESharedVerbTypes.RELEASE,
  };
  dispatch(socketEmitVerb(verb));
};
