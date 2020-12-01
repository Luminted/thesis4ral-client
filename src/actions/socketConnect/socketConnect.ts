import { SocketActionTypeKeys } from "../actionTypeKeys"

export type SocketConnectAction = {
    type: SocketActionTypeKeys.CONNECT
}

export const socketConnect = (): SocketConnectAction => {
    return {
        type: SocketActionTypeKeys.CONNECT
    }
}