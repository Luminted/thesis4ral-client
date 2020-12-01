import { normalizeVerbPositionMiddleware } from "./normalizeVerbPositionMiddleware"
import { RootState } from "../../store"
import { Verb } from "../../types/verb"
import { ActionTypes, SocketActionTypeKeys } from '../../actions'
import { createMockMiddleware } from "../testutils"

describe('Testing normalizeVerbPositionMiddleware', () => {
      it('should subtract tables position x and y from verbs position x and y', () => {
          const tablePosition ={
              x: 10,
              y: 20
          }
        const positionX = 20;
        const positionY = 100;
        const verb: Verb = {
            positionX,
            positionY,
        } as Verb;
        const expectedVerb: Verb = {
            positionX: positionX - tablePosition.x,
            positionY: positionY - tablePosition.y
        } as Verb;
        const action: ActionTypes ={
            type: SocketActionTypeKeys.EMIT_VERB,
            verb
        }
        const {invoke, next} = createMockMiddleware<ActionTypes>( normalizeVerbPositionMiddleware,{
            tablePosition
        } as RootState)
        
        invoke(action);
        expect(next).toBeCalledWith({
            type: SocketActionTypeKeys.EMIT_VERB,
            verb: expectedVerb
        })
    })
})