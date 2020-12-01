import { SerializedGameState, Verb } from "../../typings";
import { SocketActionTypeKeys } from "../actionTypeKeys";

export type SocketEmitVerbAction = {
    type: SocketActionTypeKeys.EMIT_VERB,
    verb: Verb,
    ackFunction?: Function
}

export type SocketVerbAckFunction = (nextGameState: SerializedGameState) => void;

export const socketEmitVerb = (verb: Verb, ackFunction?: SocketVerbAckFunction): SocketEmitVerbAction => {
    return {
        type: SocketActionTypeKeys.EMIT_VERB,
        verb,
        ackFunction
    }
}