import { TActionTypes, ESocketActionTypeKeys } from "../../actions";
import { Middleware } from "redux";
import { TRootState } from "../../reducers";
import { isVerbTypeWithPosition, mirrorOnTablePosition } from "../../utils";
import { ECardVerbTypes } from "../../typings";

export const mirrorVerbPositionMiddleware: Middleware<{}, TRootState> = (store) => (next) => (action: TActionTypes) => {
  if (action.type === ESocketActionTypeKeys.EMIT_VERB) {
    if (isVerbTypeWithPosition(action.verb)) {
      const { positionX, positionY } = action.verb;
      const { tablePixelDimensions } = store.getState();
      const transformedPosition = mirrorOnTablePosition(positionX, positionY, tablePixelDimensions!.width, tablePixelDimensions!.height);

      action.verb.positionX = transformedPosition[0];
      action.verb.positionY = transformedPosition[1];
      console.log("mirrored ", action.verb.positionX, action.verb.positionY);

      // GrabbedAt position needs to be mirrored too
      if (action.verb.type === ECardVerbTypes.GRAB_FROM_HAND) {
        const { grabbedAtX, grabbedAtY } = action.verb;
        const transformedGrabbedAtPosition = mirrorOnTablePosition(grabbedAtX, grabbedAtY, tablePixelDimensions!.width, tablePixelDimensions!.height);

        action.verb.grabbedAtX = transformedGrabbedAtPosition[0];
        action.verb.grabbedAtY = transformedGrabbedAtPosition[1];
      }
    }
  }
  return next(action);
};
