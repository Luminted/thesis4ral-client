import { createMockMiddleware } from "../testutils"
import { ActionTypes, SocketActionTypes, SocketActionTypeKeys } from "../../actions"
import { mirrorVerbPositionMiddleware } from "./mirrorVerbPositionMiddleware"
import { Verb } from "../../types/verbTypes";
import { inverseMirrorOnTablePosition } from "../../utils";
import { RootState } from "../../store";
import global from "../../config/global";

describe('Testing mirrorPositionMiddleware', function(){

    const mockMiddleware = createMockMiddleware<ActionTypes>(mirrorVerbPositionMiddleware);
    
    it('should apply inverseMirrorOnTablePosition on verb', function(){
        const {invoke, next} = mockMiddleware;
        const positionX = 111;
        const positionY = 333;
        const tableWidth = global.tableWidth;
        const tableHeight = global.tableHeight;
        debugger
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