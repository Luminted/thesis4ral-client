import { SocketConnectionStatuses } from "../../types/additionalTypes"
import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetTableConnectionStatusAction = {
    type: SetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
    status: SocketConnectionStatuses
}

export const setTableSocketStatus = (status: SocketConnectionStatuses): SetTableConnectionStatusAction => {
    return {
        type: SetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
        status
    }
}