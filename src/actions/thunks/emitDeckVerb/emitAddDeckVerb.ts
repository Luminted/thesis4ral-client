import { TThunkResult } from "..";
import { IEntityMetadata, ICardEntityMetadata, EDeckVerbTypes, IAddDeckVerb } from "../../../typings";
import { socketEmitVerb } from "../../";
import { TSocketVerbAckFunction } from "../../socketEmitVerb";

export const emitAddDeckVerb = (
  containedCardsMetadata: ICardEntityMetadata[],
  metadata: IEntityMetadata,
  positionX: number,
  positionY: number,
  rotation: number,
  ackFunction?: TSocketVerbAckFunction,
): TThunkResult => (dispatch) => {
  const verb: IAddDeckVerb = {
    containedCardsMetadata,
    metadata,
    positionX,
    positionY,
    rotation,
    type: EDeckVerbTypes.ADD_DECK,
  };
  dispatch(socketEmitVerb(verb, ackFunction));
};
