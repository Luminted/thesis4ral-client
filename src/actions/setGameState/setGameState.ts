import { TSerializedGameState } from "../../typings"
import { ESetterActionTypeKeys } from "../actionTypeKeys"

export type TSetGameStateAction = {
    type: ESetterActionTypeKeys.SET_GAME_STATE
    gameState: TSerializedGameState
}

export const setGameState = (gameState: TSerializedGameState): TSetGameStateAction => {
    return {
         type: ESetterActionTypeKeys.SET_GAME_STATE ,
         gameState
     }
 }