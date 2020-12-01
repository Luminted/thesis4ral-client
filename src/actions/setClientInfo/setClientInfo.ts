import { TClientInfo } from "../../typings"
import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetClientInfoAction = {
    type: ESetterActionTypeKeys.SET_CLIENT_INFO,
    clientInfo: TClientInfo
}

export const setClientInfo = (clientInfo: TClientInfo): TSetClientInfoAction => {
    return {
        type: ESetterActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}
