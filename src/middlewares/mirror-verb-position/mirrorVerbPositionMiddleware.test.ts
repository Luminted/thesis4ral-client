import { createMockMiddleware } from "../../utils/testutils"
import { TActionTypes, TSocketActionTypes, SocketActionTypeKeys } from "../../actions"
import { mirrorVerbPositionMiddleware } from "./mirrorVerbPositionMiddleware"
import { TVerb } from "../../typings";
import { inverseMirrorOnTablePosition } from "../../utils";

describe('Testing mirrorPositionMiddleware', () => {

    const tableWidth = 1200;
    const tableHeight = 1000;

    const mockMiddleware = createMockMiddleware<TActionTypes>(mirrorVerbPositionMiddleware, {
        tablePixelDimensions: {
            width: tableWidth,
            height: tableHeight
        }
    });
    
    it('should apply inverseMirrorOnTablePosition on verb', () => {
        const {invoke, next} = mockMiddleware;
        const positionX = 111;
        const positionY = 333;

        const transformedPosition = inverseMirrorOnTablePosition(positionX, positionY, tableWidth, tableHeight);
        const action: TSocketActionTypes = {
            type: SocketActionTypeKeys.EMIT_VERB,
            verb: {
                positionX,
                positionY
            } as TVerb,
        }
        const expectedTransformedAction = {
            ...action,
            verb: {
                positionX: transformedPosition[0],
                positionY: transformedPosition[1]
            } as TVerb
        }

        // jest.spyOn(mockMiddleware, 'next')
        invoke(action);
        expect(next).toHaveBeenCalledWith(expectedTransformedAction)
    })
})