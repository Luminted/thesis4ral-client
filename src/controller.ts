import {
    MouseInput,
    MouseInputTypes
} from './common/mouseEventTypes'
import {
    EntityTypes
} from './common/dataModelDefinitions';
import { MouseEvent as SyntheticMouseEvent} from 'react';
import { MaybeNull } from './common/genericTypes';
import { CardVerbTypes, Verb, SharedVerbTypes, SharedVerb } from './common/verbTypes';

enum WhichButton {
    LEFT = 1,
    MIDDLE = 2,
    RIGHT = 3
}

enum MouseEventTypes {
    MOUSE_DOWN = 'mousedown',
    MOUSE_UP = 'mouseup',
    MOUSE_MOVE = 'mousemove'
}

const cardInteractionMapping: {[key in MouseInputTypes]?: SharedVerbTypes | CardVerbTypes} = {
    LEFT_BUTTON_DOWN: SharedVerbTypes.GRAB,
    LEFT_BUTTON_UP: SharedVerbTypes.RELEASE
}


export function verbFactory(mouseInputType: MouseInputTypes, entityType: MaybeNull<EntityTypes>, entityId: MaybeNull<string>, clientId: string, cursorX: number, cursorY: number): MaybeNull<Verb>{
    if(mouseInputType === MouseInputTypes.MOUSE_MOVE){
        return {
            type: SharedVerbTypes.MOVE,
            entityId,
            entityType,
            clientId,
            cursorX,
            cursorY         
        }
    }else {
        let verbType = cardInteractionMapping[mouseInputType];
        if(verbType !== undefined) {
            console.log(verbType)
            return {
                type: verbType,
                entityId,
                entityType,
                clientId,
                cursorX,
                cursorY
                
            } as Verb
        }
    
        return null;
    }
}

export function mouseInputTypeFactory(event: SyntheticMouseEvent): MouseInputTypes {
    const buttonPressed : WhichButton = event.nativeEvent.which;
    if(buttonPressed === WhichButton.LEFT){
        const mouseEventType: MouseEventTypes = event.type as MouseEventTypes;
        if(mouseEventType === MouseEventTypes.MOUSE_DOWN){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_LEFT_BUTTON_DOWN;
            } else {
                return MouseInputTypes.LEFT_BUTTON_DOWN;
            }
        }
        else if(mouseEventType === MouseEventTypes.MOUSE_MOVE){
            return MouseInputTypes.MOUSE_MOVE;
        }
        else{
            return MouseInputTypes.LEFT_BUTTON_UP;
        }
    }
    else {
        return MouseInputTypes.UNKNOWN_INPUT;
    }
}