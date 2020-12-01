import { ESocketActionTypeKeys } from "../actionTypeKeys"

export type TSocketConnectAction = {
    type: ESocketActionTypeKeys.CONNECT
}

export const socketConnect = (): TSocketConnectAction => {
    return {
        type: ESocketActionTypeKeys.CONNECT
    }
}