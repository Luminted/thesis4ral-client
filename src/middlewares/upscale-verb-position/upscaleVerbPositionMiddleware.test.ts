import { TVerb, ESharedVerbTypes, TRatio } from '../../typings';
import {upscale} from '../../utils';
import { upscaleVerbPositionMiddleware } from './upscaleVerbPositionMiddleware';
import {createMockMiddleware} from '../../utils/testutils';
import { ESocketActionTypeKeys, TActionTypes } from '../../actions';
import { TSocketEmitVerbAction } from '../../actions/socketEmitVerb';
import { TRootState } from '../../reducers';

describe('Testing upscaleVerbPositionMiddleware', ()=> {
    const horizontalScalingRatio: TRatio = {
        numerator: 4,
        divisor: 12
    }
    const verticalScalingRatio: TRatio = {
        numerator: 3,
        divisor: 9
    }
    const mockMiddleware = createMockMiddleware<TActionTypes>(upscaleVerbPositionMiddleware, {
        horizontalScalingRatio,
        verticalScalingRatio
    } as TRootState);

    it('should apply upscalePosition to verbs X and Y position', ()=> {
        const positionX = 1;
        const positionY = 2;
        const verb: TVerb = {
            clientId: 'c-1',
            positionX,
            positionY,
            type: ESharedVerbTypes.MOVE
        }
        const action: TSocketEmitVerbAction = {
            type: ESocketActionTypeKeys.EMIT_VERB,
            verb
        }
        const expectedAction: TSocketEmitVerbAction = {
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