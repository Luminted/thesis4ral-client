import { TGameState, TMaybeNull, TVerb } from "../typings";
import { ESocketActionTypeKeys } from "./actionTypeKeys";

export type TSocketEmitVerbAction = {
  type: ESocketActionTypeKeys.VERB;
  verb: TVerb;
  ackFunction?: (...args: any) => void;
};

export type TSocketVerbAckFunction = (error: TMaybeNull<string>, nextGameState: TGameState, result?: any) => void;

export const socketEmitVerb = (verb: TVerb, ackFunction?: TSocketVerbAckFunction): TSocketEmitVerbAction => {
  return {
    type: ESocketActionTypeKeys.VERB,
    verb,
    ackFunction,
  };
};
