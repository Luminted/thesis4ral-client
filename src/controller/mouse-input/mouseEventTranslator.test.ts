import * as assert from 'assert';

import {mouseEventTranslator} from './mouseEventTranslator'
import { ListenedMouseEventTypes, WhichButton } from './types';
import { MouseInputTypes } from '../../common/mouseEventTypes';
import { SyntheticEvent } from 'react';

type MockMouseEvent = {
    type: ListenedMouseEventTypes,
    altKey?: boolean,
    ctrlKey?: boolean,
    shiftKey?: boolean,
    nativeEvent?: {
        which: WhichButton
    }
}

const clickEvents: ListenedMouseEventTypes[] = [ListenedMouseEventTypes.MOUSE_DOWN, ListenedMouseEventTypes.MOUSE_UP]
const mouseButtons: WhichButton[] = [WhichButton.LEFT, WhichButton.MIDDLE, WhichButton.RIGHT]
const mouseClickInputs: string[] = [];
for(let input in MouseInputTypes){
    if(input.includes('BUTTON')){
        mouseClickInputs.push(input);
    }
}

describe('mouseEventTranslator -- mouse up and down events', function(){
    let clickInputIndex = 0;
    for(let mouseButton of mouseButtons) {
        for(let clickEventType of clickEvents){
            let event: MockMouseEvent = {
                type: clickEventType,
                nativeEvent: {
                    which: mouseButton
                }
            }
            //testing for unaltered, ctrl and shift events
            for(let i = 0; i < 3; i++){
                if(i % 3 == 1){
                    event.ctrlKey = true;
                }else if(i % 3 == 2){
                    event.shiftKey = true;
                }
                const testedInputType = mouseClickInputs[clickInputIndex];
                clickInputIndex++;
                debugger
                it(`should return ${testedInputType}`, function(){
                    console.log(event)
                    assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), testedInputType)
                })
            }
        }
    }
})

// describe(`type: ${ListenedMouseEventTypes.MOUSE_DOWN}`, function(){
//     const type = ListenedMouseEventTypes.MOUSE_DOWN;
//     const which = WhichButton.LEFT;
//     it(`should return ${MouseInputTypes.LEFT_BUTTON_DOWN}`, function() {
//         const event: MockMouseEvent = {
//             type,
//             altKey: false,
//             ctrlKey: false,
//             shiftKey: false,
//             nativeEvent: {
//                 which
//             } 
//         };
//         assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), MouseInputTypes.LEFT_BUTTON_DOWN);
//     })
//     it(`should return ${MouseInputTypes.CTRL_LEFT_BUTTON_DOWN}`, function() {
//         const event: MockMouseEvent = {
//             type,
//             altKey: false,
//             ctrlKey: true,
//             shiftKey: false,
//             nativeEvent: {
//                 which
//             } 
//         };
//         assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), MouseInputTypes.CTRL_LEFT_BUTTON_DOWN);
//     })
// })

// describe(`type: ${ListenedMouseEventTypes.MOUSE_UP}`, function(){
//     const type = ListenedMouseEventTypes.MOUSE_UP;
//     const which = WhichButton.LEFT;
//     it(`should return ${MouseInputTypes.LEFT_BUTTON_UP}`, function() {
//         const event: MockMouseEvent = {
//             type,
//             altKey: false,
//             ctrlKey: false,
//             shiftKey: false,
//             nativeEvent: {
//                 which
//             } 
//         };
//         assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), MouseInputTypes.LEFT_BUTTON_UP);
//     })
//     it(`should return ${MouseInputTypes.CTRL_LEFT_BUTTON_UP}`, function() {
//         const event: MockMouseEvent = {
//             type,
//             altKey: false,
//             ctrlKey: true,
//             shiftKey: false,
//             nativeEvent: {
//                 which
//             } 
//         };
//         assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), MouseInputTypes.CTRL_LEFT_BUTTON_UP);
//     })
// })
// describe(`type: ${ListenedMouseEventTypes.MOUSE_MOVE}`, function(){
//     const type = ListenedMouseEventTypes.MOUSE_UP;
//     it(`should return ${MouseInputTypes.MOUSE_MOVE}`, function(){
//         const event: MockMouseEvent = {
//             type
//         }
//         assert.equal(mouseEventTranslator((event as unknown) as SyntheticEvent), MouseInputTypes.MOUSE_MOVE);
//     })
// })