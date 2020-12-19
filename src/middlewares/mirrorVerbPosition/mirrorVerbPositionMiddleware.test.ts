import { createMockMiddleware } from "../../utils";
import { TActionTypes, TSocketActionTypes, ESocketActionTypeKeys } from "../../actions";
import { mirrorVerbPositionMiddleware } from "./mirrorVerbPositionMiddleware";
import { TVerb } from "../../typings";
import { inverseMirrorOnTablePosition } from "../../utils";

describe("mirrorPositionMiddleware", () => {
  const tableWidth = 1200;
  const tableHeight = 1000;

  const mockMiddleware = createMockMiddleware<TActionTypes>(mirrorVerbPositionMiddleware, {
    tablePixelDimensions: {
      width: tableWidth,
      height: tableHeight,
    },
  });

  it("should apply inverseMirrorOnTablePosition on verb", () => {
    const { invoke, next } = mockMiddleware;
    const positionX = 111;
    const positionY = 333;

    const transformedPosition = inverseMirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
    /* tslint:disable */
    const action: TSocketActionTypes = {
      type: ESocketActionTypeKeys.VERB,
      verb: {
        positionX,
        positionY,
      } as TVerb,
    };
    /* tslint:enable */
    const expectedTransformedAction = {
      ...action,
      verb: {
        positionX: transformedPosition[0],
        positionY: transformedPosition[1],
      },
    };

    invoke(action);
    expect(next).toHaveBeenCalledWith(expectedTransformedAction);
  });
});
