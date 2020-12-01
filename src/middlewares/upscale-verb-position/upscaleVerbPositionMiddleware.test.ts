import { Verb, SharedVerbTypes, Ratio } from '../../typings';
import {upscale} from '../../utils';
import { upscaleVerbPositionMiddleware } from './upscaleVerbPositionMiddleware';
import {createMockMiddleware} from '../testutils';
import { SocketActionTypeKeys, ActionTypes } from '../../actions';
import { SocketEmitVerbAction } from '../../actions/socketEmitVerb';
import { RootState } from '../../store';

describe('Testing upscaleVerbPositionMiddleware', ()=> {
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

    it('should apply upscalePosition to verbs X and Y position', ()=> {
        const positionX = 1;
        const positionY = 2;
        const verb: Verb = {
            clientId: 'c-1',
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