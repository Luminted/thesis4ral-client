import { TThunkResult } from "..";
import { EDeckVerbTypes, IShuffleVerb } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitShuffleVerb = (entityId: string): TThunkResult => (dispatch) => {
  const verb: IShuffleVerb = {
    entityId,
    type: EDeckVerbTypes.SHUFFLE,
  };
  dispatch(socketEmitVerb(verb));
};
