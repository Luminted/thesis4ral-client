import { TClientInfo, TGameState } from "../../typings"
import { ESocketActionTypeKeys } from "../actionTypeKeys"

type SocketJoinTableAckFunction = (clientInfo: TClientInfo, gameState: TGameState) => void

export type TSocketJoinTableAction = {
    type: ESocketActionTypeKeys.JOIN_TABLE
    requestedSeatId: string,
    ackFunction?: SocketJoinTableAckFunction
}

export const socketJoinTable = (requestedSeatId: string, ackFunction?: SocketJoinTableAckFunction): TSocketJoinTableAction => {
    return {
        type: ESocketActionTypeKeys.JOIN_TABLE,
        requestedSeatId,
        ackFunction
    }
}