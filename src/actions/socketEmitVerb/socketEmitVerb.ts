import { TGameState, TVerb } from "../../typings";
import { ESocketActionTypeKeys } from "../actionTypeKeys";

export type TSocketEmitVerbAction = {
    type: ESocketActionTypeKeys.EMIT_VERB,
    verb: TVerb,
    ackFunction?: Function
}

export type TSocketVerbAckFunction = (nextGameState: TGameState) => void;

export const socketEmitVerb = (verb: TVerb, ackFunction?: TSocketVerbAckFunction): TSocketEmitVerbAction => {
    return {
        type: ESocketActionTypeKeys.EMIT_VERB,
        verb,
        ackFunction
    }
}