import { ClientInfo, SerializedGameState } from "../../types/dataModelDefinitions"
import { SocketActionTypeKeys } from "../actionTypeKeys"

type SocketJoinTableAckFunction = (clientInfo: ClientInfo, gameState: SerializedGameState) => void

export type SocketJoinTableAction = {
    type: SocketActionTypeKeys.JOIN_TABLE
    ackFunction?: SocketJoinTableAckFunction
}

export const socketJoinTable = (ackFunction?: SocketJoinTableAckFunction): SocketJoinTableAction => {
    return {
        type: SocketActionTypeKeys.JOIN_TABLE,
        ackFunction
    }
}