import { TClientInfo, TSerializedGameState } from "../../typings"
import { ESocketActionTypeKeys } from "../actionTypeKeys"

type SocketJoinTableAckFunction = (clientInfo: TClientInfo, gameState: TSerializedGameState) => void

export type TSocketJoinTableAction = {
    type: ESocketActionTypeKeys.JOIN_TABLE
    ackFunction?: SocketJoinTableAckFunction
}

export const socketJoinTable = (ackFunction?: SocketJoinTableAckFunction): TSocketJoinTableAction => {
    return {
        type: ESocketActionTypeKeys.JOIN_TABLE,
        ackFunction
    }
}