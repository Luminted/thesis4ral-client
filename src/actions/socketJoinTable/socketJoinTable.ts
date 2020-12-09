import { TClientInfo, TMaybeNull } from "../../typings"
import { ESocketActionTypeKeys } from "../actionTypeKeys"

type TSocketJoinTableAckFunction = (error: TMaybeNull<string>, clientInfo: TClientInfo) => void

export type TSocketJoinTableAction = {
    type: ESocketActionTypeKeys.JOIN_TABLE
    requestedSeatId: string,
    name: string,
    ackFunction?: TSocketJoinTableAckFunction
}

export const socketJoinTable = (requestedSeatId: string, name: string, ackFunction?: TSocketJoinTableAckFunction): TSocketJoinTableAction => {
    return {
        type: ESocketActionTypeKeys.JOIN_TABLE,
        requestedSeatId,
        name,
        ackFunction
    }
}