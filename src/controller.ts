import {
    MouseInput,
    MouseInputTypes
} from './common/mouseEventTypes'
import {
    EntityTypes
} from './common/dataModelDefinitions';
import { MouseEvent as SyntheticMouseEvent} from 'react';
import { MaybeNull } from './common/genericTypes';

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

export function mouseInputEventFactory(event: SyntheticMouseEvent, clientId: string, entityId: MaybeNull<string>, entityType: MaybeNull<EntityTypes>) {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    let input: MouseInput;
    switch (event.nativeEvent.which as WhichButton) {
        case WhichButton.LEFT:
            switch (event.type as MouseEventTypes) {
                case MouseEventTypes.MOUSE_DOWN:
                    if (event.ctrlKey) {
                        input = {
                            type: MouseInputTypes.CTRL_LEFT_BUTTON_DOWN,
                            entityId,
                            entityType,
                            clientId,
                            cursorX,
                            cursorY,
                        }
                    } else {
                        input = {
                            type: MouseInputTypes.LEFT_BUTTON_DOWN,
                            entityId,
                            entityType,
                            clientId,
                            cursorX,
                            cursorY
                        }
                    }
                    return input;

                case MouseEventTypes.MOUSE_MOVE:
                    input = {
                        type: MouseInputTypes.MOUSE_MOVE,
                        entityId,
                        entityType,
                        clientId,
                        cursorX,
                        cursorY
                        }
                        return input;

                case MouseEventTypes.MOUSE_UP:
                    input = {
                        type: MouseInputTypes.LEFT_BUTTON_UP,
                        entityId,
                        entityType,
                        clientId,
                        cursorX,
                        cursorY
                    }
                    return input;

            }
            break;
        default:
           input = {
               type: MouseInputTypes.UNKNOWN_INPUT,
               entityId,
               entityType,
               clientId,
               cursorX,
               cursorY
           }
           return input;
        }
}