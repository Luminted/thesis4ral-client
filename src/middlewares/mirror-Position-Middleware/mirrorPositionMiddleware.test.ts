import { createMockMiddleware } from "../testutils"
import { ActionTypes, SocketActionTypes, SocketActionTypeKeys } from "../../actions"
import { mirrorPositionMiddleware } from "./mirrorPositionMiddleware"
import { Verb } from "../../types/verbTypes";
import { mirrorOnTablePosition } from "../../utils";
import { RootState } from "../../store";

describe('Testing mirrorPositionMiddleware', function(){
    
    const store = {
        tablePosition:{
            x: 100,
            y: 150
        }
    } as RootState
    const mockMiddleware = createMockMiddleware<ActionTypes>(mirrorPositionMiddleware, store);
    
    it('should apply mirrorOnTablePosition on verb', function(){
        const {invoke, next} = mockMiddleware;
        const positionX = 111;
        const positionY = 333;
        const transformedPosition = mirrorOnTablePosition(positionX, positionY, store.tablePosition.x, store.tablePosition.y);
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