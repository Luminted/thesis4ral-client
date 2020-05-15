import { normalizeVerbPositionMiddleware } from "./normalizeVerbPositionMiddleware"
import { RootState } from "../../store"
import { Verb } from "../../types/verbTypes"
import { ActionTypes } from '../../actions'
import { createMockMiddleware } from "../testutils"
import { SocketActionTypeKeys } from "../../actions/socketActions"

describe('Testing normalizeVerbPositionMiddleware', function(){
      it('should subtract tables position x and y from verbs position x and y', function(){
          const tablePosition ={
              x: 10,
              y: 20
          }
        const verb: Verb = {
            positionX: 20,
            positionY: 100
        } as Verb;
        const expectedVerb: Verb = {
            positionX: verb.positionX - tablePosition.x,
            positionY: verb.positionY - tablePosition.y
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