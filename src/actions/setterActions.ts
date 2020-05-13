import { ClientInfo, GameState } from "../types/dataModelDefinitions"

export enum SetActionTypeKeys {
    SET_CLIENT_INFO = 'SET_CLIENT_INFO',
    SET_TABLE_POSITION = 'SET_TABLE_POSITION',
    SET_TABLE_BOUNDARIES = 'SET_TABLE_BOUNDARIES',
    SET_PLAYAREA_BOUNDARIES = 'SET_PLAYAREA_BOUNDARIES',
    SET_GAME_STATE = 'SET_GAME_STATE',
    SET_GRABBED_ENTITY_ORIGINAL_POSITION = 'SET_GRABBED_ENTITY_ORIGINAL_POSITION'
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
    gameState: GameState
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

export function setPlayareaBoundaries(top: number, bottom: number, left: number, right: number): SetPlayareaBoundariesAction {
    return {
        type: SetActionTypeKeys.SET_PLAYAREA_BOUNDARIES,
        top,
        bottom,
        left,
        right
    }
}

export function setClientInfo(clientInfo: ClientInfo): SetClientInfoAction {
    return {
        type: SetActionTypeKeys.SET_CLIENT_INFO,
        clientInfo
    }
}

export function setGameState(gameState: GameState): SetGameStateAction {
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