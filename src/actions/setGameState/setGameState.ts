import { SerializedGameState } from "../../typings"
import { SetterActionTypeKeys } from "../actionTypeKeys"

export type SetGameStateAction = {
    type: SetterActionTypeKeys.SET_GAME_STATE
    gameState: SerializedGameState
}

export const setGameState = (gameState: SerializedGameState): SetGameStateAction => {
    return {
         type: SetterActionTypeKeys.SET_GAME_STATE ,
         gameState
     }
 }