import { ClientInfo, SerializedGameState } from "../../types/dataModelDefinitions"
import { SocketConnectionStatuses, Ratio } from "../../types/additionalTypes"
import { SetActionTypeKeys } from "./actionTypes";

export type SetTablePixelDimensions = {
    type: SetActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
    dimensions: {
        width: number,
        height: number
    }
}

export type SetHorizontalScalingRation = {
    type: SetActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO,
    ratio: Ratio
}

export type SetVerticalScalingRation = {
    type: SetActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
    ratio: Ratio
}

export type SetTableReadyAction = {
    type: SetActionTypeKeys.SET_TABLE_READY,
    ready: boolean
}

export type SetTableConnectionStatusAction = {
    type: SetActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
    status: SocketConnectionStatuses
}

export type SetClientInfoAction = {
    type: SetActionTypeKeys.SET_CLIENT_INFO,
    clientInfo: ClientInfo
}

export type SetTablePositionAction = {
    type: SetActionTypeKeys.SET_TABLE_POSITION,
    positionX: number,
    positionY: number
}

export type SetGameStateAction = {
    type: SetActionTypeKeys.SET_GAME_STATE
    gameState: SerializedGameState
}

export function setTablePixelDimensions(width: number, height: number): SetTablePixelDimensions{
    return {
        type: SetActionTypeKeys.SET_TABLE_PIXEL_DIMENSIONS,
        dimensions: {
            width,
            height
        }
    }
}

export function setHorizontalScalingRatio(ratio: Ratio): SetHorizontalScalingRation{
    return {
        type: SetActionTypeKeys.SET_HORIZONTAL_SCALING_RATIO,
        ratio
    }
}

export function setVerticalScalingRatio(ratio: Ratio): SetVerticalScalingRation {
    return {
        type: SetActionTypeKeys.SET_VERTICAL_SCALING_RATIO,
        ratio
    }
}

export function setTableReady(ready: boolean): SetTableReadyAction{
    return {
        type: SetActionTypeKeys.SET_TABLE_READY,
        ready
    }
}

export function setTableSocketStatus(status: SocketConnectionStatuses): SetTableConnectionStatusAction {
    return {
        type: SetActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
        status
    }
}

export function setClientInfo(clientInfo: ClientInfo): SetClientInfoAction {
    return {
        type: SetActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}

export function setGameState(gameState: SerializedGameState): SetGameStateAction {
   return {
        type: SetActionTypeKeys.SET_GAME_STATE ,
        gameState
    }
}

export function setTablePosition(positionX: number, positionY: number): SetTablePositionAction{
    return {
        type: SetActionTypeKeys.SET_TABLE_POSITION,
        positionX,
        positionY
    }
}