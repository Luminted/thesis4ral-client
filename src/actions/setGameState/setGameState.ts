import { TGameState } from "../../typings"
import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetGameStateAction = {
    type: ESetterActionTypeKeys.SET_GAME_STATE
    gameState: TGameState
}

export const setGameState = (gameState: TGameState): TSetGameStateAction => {
    return {
         type: ESetterActionTypeKeys.SET_GAME_STATE ,
         gameState
     }
 }