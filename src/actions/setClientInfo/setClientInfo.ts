import { ClientInfo } from "../../types/dataModelDefinitions"
import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetClientInfoAction = {
    type: SetterActionTypeKeys.SET_CLIENT_INFO,
    clientInfo: ClientInfo
}

export const setClientInfo = (clientInfo: ClientInfo): SetClientInfoAction => {
    return {
        type: SetterActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}
