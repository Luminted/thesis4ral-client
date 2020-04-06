import * as assert from 'assert';

import {mouseEventTranslator} from './mouseEventTranslator'
import { ListenedMouseEventTypes, WhichButton, MouseInputTypes, ListenedDragEventTypes } from '../types';
import { SyntheticEvent, MouseEvent, DragEvent } from 'react';

type MockMouseEvent = {
    type: string,
    altKey?: boolean,
    ctrlKey?: boolean,
    shiftKey?: boolean,
    nativeEvent?: {
        which: WhichButton
    }
}

describe('mouseEventTranslator -- mouse up and down events', function(){

    const clickEvents: ListenedMouseEventTypes[] = [ListenedMouseEventTypes.MOUSE_DOWN, ListenedMouseEventTypes.MOUSE_UP]
    const mouseButtons: WhichButton[] = [WhichButton.LEFT, WhichButton.MIDDLE, WhichButton.RIGHT]
    const mouseClickInputs: string[] = [];
    for(let input in MouseInputTypes){
        if(input.includes('BUTTON')){
            mouseClickInputs.push(input);
        }
    }

    let events: MockMouseEvent[] = [];

    beforeEach(function() {
        for(let mouseButton of mouseButtons) {
            for(let clickEventType of clickEvents){
                //setting modifier key
                for(let i = 0; i < 3; i++){
                    let event: MockMouseEvent = {
                        type: clickEventType,
                        nativeEvent: {
                            which: mouseButton
                        }
                    }
                    if(i % 3 == 1){
                        event.ctrlKey = true;
                        event.altKey = false;
                        event.shiftKey = false;
                    }else if(i % 3 == 2){
                        event.ctrlKey = false;
                        event.altKey = false;
                        event.shiftKey = true;
                    }else {
                        event.ctrlKey = false;
                        event.altKey = false;
                        event.shiftKey = false;
                    }
                events.push(event);
                }
            }
        }
    })

    it('looping through tests', function(){
        for(let i = 0; i < events.length; i++){
            const testedMouseInputType = mouseClickInputs[i];
            let result = mouseEventTranslator((events[i] as unknown) as MouseEvent);
            assert.equal(result, testedMouseInputType)

        }
    })
})

describe('mouseEventTranslator -- drag events', function(){

    it(`should return ${MouseInputTypes.DRAG_START}`, function(){
        const event: MockMouseEvent = {
            type: ListenedDragEventTypes.ON_DRAG_START
        }

        assert.equal(mouseEventTranslator((event as unknown) as DragEvent), MouseInputTypes.DRAG_START);
    })

    it(`should return ${MouseInputTypes.CTRL_DRAG_START}`, function(){
        const event: MockMouseEvent = {
            type: ListenedDragEventTypes.ON_DRAG_START,
            ctrlKey: true
        }

        assert.equal(mouseEventTranslator((event as unknown) as DragEvent), MouseInputTypes.CTRL_DRAG_START);
    })

    it(`should return ${MouseInputTypes.SHFT_DRAG_START}`, function(){
        const event: MockMouseEvent = {
            type: ListenedDragEventTypes.ON_DRAG_START,
            shiftKey: true
        }

        assert.equal(mouseEventTranslator((event as unknown) as DragEvent), MouseInputTypes.SHFT_DRAG_START);
    })

})

describe('mouseEventTranslator -- mouse move event', function(){
    it(`should return ${MouseInputTypes.MOUSE_MOVE}`, function(){
        const event: MockMouseEvent = {
            type: ListenedMouseEventTypes.MOUSE_MOVE
        }
        assert.equal(mouseEventTranslator((event as unknown) as MouseEvent), MouseInputTypes.MOUSE_MOVE);
    })
})

describe('mouseEventTranslator -- unknown event', function(){
    it(`should return ${MouseInputTypes.UNKNOWN_INPUT} for unhandles events`, function(){
        const event: MockMouseEvent = {
            type: 'unhandledevent'
        }
        assert.equal(mouseEventTranslator((event as unknown) as MouseEvent), MouseInputTypes.UNKNOWN_INPUT);
    })
})