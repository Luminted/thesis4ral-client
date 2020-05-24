import { Verb, SharedVerbTypes } from '../../types/verbTypes';
import { EntityTypes } from '../../types/dataModelDefinitions';
import { Ratio } from '../../types/additionalTypes';
import {upscale} from '../../utils';
import { upscaleVerbPositionMiddleware } from './upscaleVerbPositionMiddleware';
import { ActionTypes } from '../../actions';
import {createMockMiddleware} from '../testutils';
import { socketEmitVerb, SocketEmitVerbAction, SocketActionTypeKeys } from '../../actions/socketActions';
import { RootState } from '../../store';

describe('Testing upscaleVerbPositionMiddleware', function(){
    const horizontalScalingRatio: Ratio = {
        numerator: 4,
        divisor: 12
    }
    const verticalScalingRatio: Ratio = {
        numerator: 3,
        divisor: 9
    }
    const mockMiddleware = createMockMiddleware<ActionTypes>(upscaleVerbPositionMiddleware, {
        horizontalScalingRatio,
        verticalScalingRatio
    } as RootState);

    it('should apply upscalePosition to verbs X and Y position', function(){
        const positionX = 1;
        const positionY = 2;
        const verb: Verb = {
            clientId: 'c-1',
            entityId: 'e-1',
            entityType: EntityTypes.CARD,
            positionX,
            positionY,
            type: SharedVerbTypes.MOVE
        }
        const action: SocketEmitVerbAction = {
            type: SocketActionTypeKeys.EMIT_VERB,
            verb
        }
        const expectedAction: SocketEmitVerbAction = {
            ...action,
            verb: {
                ...verb,
                positionX: upscale(horizontalScalingRatio, positionX),
                positionY: upscale(verticalScalingRatio, positionY)
            }
        }

        const {invoke, next} = mockMiddleware
        invoke(action);
        expect(next).toHaveBeenCalledWith(expectedAction);
    })

})