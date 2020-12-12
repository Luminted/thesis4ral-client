import { ECardVerbTypes, IFlipVerb } from "../../../typings";
import { socketEmitVerb, TThunkResult } from "../../";

export const emitFlipVerb = (entityId: string): TThunkResult => (dispatch) => {
  const verb: IFlipVerb = {
    entityId,
    type: ECardVerbTypes.FLIP,
  };
  dispatch(socketEmitVerb(verb));
};
