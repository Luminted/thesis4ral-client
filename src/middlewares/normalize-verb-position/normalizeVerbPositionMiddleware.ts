import { Middleware } from "redux";
import { ECardVerbTypes } from "../../typings";
import { TRootState } from "../../reducers";
import { TActionTypes, ESocketActionTypeKeys } from "../../actions";
import { isVerbTypeWithPosition } from "../../utils";

/**
 * Normalizes coordinates so that tables top right corner is the origo
 */
export const normalizeVerbPositionMiddleware: Middleware<{}, TRootState> = (store) => (next) => (action: TActionTypes) => {
  if (action.type === ESocketActionTypeKeys.EMIT_VERB) {
    if (isVerbTypeWithPosition(action.verb)) {
      const { positionX, positionY } = action.verb;
      const { tablePosition } = store.getState();

      action.verb.positionX = positionX - tablePosition.x;
      action.verb.positionY = positionY - tablePosition.y;

      // GRAB_FROM_HAND has another set of position that needs to be normalized
      if (action.verb.type === ECardVerbTypes.GRAB_FROM_HAND) {
        const { grabbedAtX, grabbedAtY } = action.verb;
        action.verb.grabbedAtX = grabbedAtX - tablePosition.x;
        action.verb.grabbedAtY = grabbedAtY - tablePosition.y;
      }
    }
  }
  return next(action);
};
