import { ClientInfo, GameState, SerializedGameState } from "../types/dataModelDefinitions"
import { SocketConnectionStatuses, Orientations } from "../types/additionalTypes"

export enum SetActionTypeKeys {
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',
    SET_TABLE_POSITION = 'SET_TABLE_POSITION',
    SET_TABLE_BOUNDARIES = 'SET_TABLE_BOUNDARIES',
    SET_PLAYAREA_BOUNDARIES = 'SET_PLAYAREA_BOUNDARIES',
    SET_GAME_STATE = 'SET_GAME_STATE',
    SET_GRABBED_ENTITY_ORIGINAL_POSITION = 'SET_GRABBED_ENTITY_ORIGINAL_POSITION',
    SET_TABLE_CONNECTION_STATUS = 'SET_TABLE_CONNECTION_STATUS',
    SET_ORIENTATION = 'SET_ORIENTATION'
}

export type SetOrientationAction = {
    type: SetActionTypeKeys.SET_ORIENTATION,
    orientation: Orientations
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

export type SetTableBoundariesAction = {
    type: SetActionTypeKeys.SET_TABLE_BOUNDARIES,
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type SetPlayareaBoundariesAction = {
    type: SetActionTypeKeys.SET_PLAYAREA_BOUNDARIES,
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type SetGameStateAction = {
    type: SetActionTypeKeys.SET_GAME_STATE
    gameState: SerializedGameState
}

export function setOrientationAction(orientation: Orientations): SetOrientationAction {
    return {
        type: SetActionTypeKeys.SET_ORIENTATION,
        orientation
    }
}

export function setTableSocketStatus(status: SocketConnectionStatuses): SetTableConnectionStatusAction {
    return {
        type: SetActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
        status
    }
}

export function setTableBoundaries(top: number, bottom: number, left: number, right: number): SetTableBoundariesAction {
    return {
        type: SetActionTypeKeys.SET_TABLE_BOUNDARIES,
        top,
        bottom,
        left,
        right
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