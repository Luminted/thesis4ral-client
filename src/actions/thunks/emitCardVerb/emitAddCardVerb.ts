import { TThunkResult } from "..";
import { ECardVerbTypes, IAddCardVerb, ICardEntityMetadata } from "../../../typings";
import { socketEmitVerb } from "../../";

export const emitAddCardVerb = (faceUp: boolean, metadata: ICardEntityMetadata, positionX: number, positionY: number, rotation: number): TThunkResult => (dispatch) => {
  const verb: IAddCardVerb = {
    faceUp,
    metadata,
    positionX,
    positionY,
    rotation,
    type: ECardVerbTypes.ADD_CARD,
  };
  dispatch(socketEmitVerb(verb));
};
