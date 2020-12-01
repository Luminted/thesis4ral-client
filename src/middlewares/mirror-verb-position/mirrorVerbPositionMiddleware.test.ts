import { createMockMiddleware } from "../testutils"
import { ActionTypes, SocketActionTypes, SocketActionTypeKeys } from "../../actions"
import { mirrorVerbPositionMiddleware } from "./mirrorVerbPositionMiddleware"
import { Verb } from "../../typings";
import { inverseMirrorOnTablePosition } from "../../utils";

describe('Testing mirrorPositionMiddleware', () => {

    const tableWidth = 1200;
    const tableHeight = 1000;

    const mockMiddleware = createMockMiddleware<ActionTypes>(mirrorVerbPositionMiddleware, {
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
        const action: SocketActionTypes = {
            type: SocketActionTypeKeys.EMIT_VERB,
            verb: {
                positionX,
                positionY
            } as Verb,
        }
        const expectedTransformedAction = {
            ...action,
            verb: {
                positionX: transformedPosition[0],
                positionY: transformedPosition[1]
            } as Verb
        }

        // jest.spyOn(mockMiddleware, 'next')
        invoke(action);
        expect(next).toHaveBeenCalledWith(expectedTransformedAction)
    })
})