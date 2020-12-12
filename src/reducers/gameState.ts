import { ESetterActionTypeKeys, TActionTypes } from "../actions";
import { TGameState } from "../typings";

const initialState = {
  cards: [],
  decks: [],
  clients: [],
  hands: [],
};

export const gameState = (state: TGameState = initialState, action: TActionTypes) => {
  switch (action.type) {
    case ESetterActionTypeKeys.SET_GAME_STATE:
      const { cards, decks, clients, hands } = action.gameState;
      return {
        cards,
        decks,
        clients,
        hands,
      };
    default:
      return state;
  }
};
