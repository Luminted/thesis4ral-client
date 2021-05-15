import { translateVerbPositionMiddleware } from "./translateVerbPositionMiddleware";
import { TVerb } from "../../typings";
import { TActionTypes, ESocketActionTypeKeys } from "../../actions";
import { createMockMiddleware } from "../../utils";

describe("translateVerbPositionMiddleware", () => {
  it("should subtract tables position x and y from verbs position x and y", () => {
    const tablePosition = {
      x: 10,
      y: 20,
    };
    const positionX = 20;
    const positionY = 100;
    /* tslint:disable */
    const verb: TVerb = {
      positionX,
      positionY,
    } as TVerb;
    /* tslint:enable */
    const expectedVerb = {
      positionX: positionX - tablePosition.x,
      positionY: positionY - tablePosition.y,
    };
    const action: TActionTypes = {
      type: ESocketActionTypeKeys.VERB,
      verb,
    };
    const { invoke, next } = createMockMiddleware<TActionTypes>(translateVerbPositionMiddleware, {
      tablePosition,
    });

    invoke(action);
    expect(next).toBeCalledWith({
      type: ESocketActionTypeKeys.VERB,
      verb: expectedVerb,
    });
  });
});
