import { normalizeVerbPositionMiddleware } from "./normalizeVerbPositionMiddleware"
import { TRootState } from "../../reducers"
import { TVerb } from "../../typings"
import { TActionTypes, SocketActionTypeKeys } from '../../actions'
import { createMockMiddleware } from "../../utils/testutils"

describe('Testing normalizeVerbPositionMiddleware', () => {
      it('should subtract tables position x and y from verbs position x and y', () => {
          const tablePosition ={
              x: 10,
              y: 20
          }
        const positionX = 20;
        const positionY = 100;
        const verb: TVerb = {
            positionX,
            positionY,
        } as TVerb;
        const expectedVerb: TVerb = {
            positionX: positionX - tablePosition.x,
            positionY: positionY - tablePosition.y
        } as TVerb;
        const action: TActionTypes ={
            type: SocketActionTypeKeys.EMIT_VERB,
            verb
        }
        const {invoke, next} = createMockMiddleware<TActionTypes>( normalizeVerbPositionMiddleware,{
            tablePosition
        } as TRootState)
        
        invoke(action);
        expect(next).toBeCalledWith({
            type: SocketActionTypeKeys.EMIT_VERB,
            verb: expectedVerb
        })
    })
})