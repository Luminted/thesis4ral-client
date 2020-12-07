import { TClientInfo, TMaybeNull } from "../../typings"
import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetClientInfoAction = {
    type: ESetterActionTypeKeys.SET_CLIENT_INFO,
    clientInfo: TMaybeNull<TClientInfo>
}

export const setClientInfo = (clientInfo: TMaybeNull<TClientInfo>): TSetClientInfoAction => {
    return {
        type: ESetterActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}
