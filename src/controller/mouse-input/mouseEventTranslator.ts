import { WhichButton } from "./types";
import { SyntheticEvent, MouseEvent as SyntheticMouseEvent, DragEvent as SyntheticDragEvent} from 'react';
import { MouseInputTypes, ListenedMouseEventTypes } from "./types";


export function mouseEventTranslator(event: SyntheticEvent): MouseInputTypes {
    if(isDragEvent(event)){

    }else if(isMouseEvent(event)) {
        return clickTranslator(event);
    }

    return MouseInputTypes.UNKNOWN_INPUT;
}

function dragTranslator( event: MouseEvent): MouseInputTypes {
    return MouseInputTypes.UNKNOWN_INPUT;
}

function clickTranslator (event: SyntheticMouseEvent): MouseInputTypes {
    const buttonPressed : WhichButton = event.nativeEvent.which;
    const mouseEventType: ListenedMouseEventTypes = event.type as ListenedMouseEventTypes;
    if(buttonPressed === WhichButton.LEFT){
        if(mouseEventType === ListenedMouseEventTypes.MOUSE_DOWN){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_LEFT_BUTTON_DOWN;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_LEFT_BUTTON_DOWN
            } else{
                return MouseInputTypes.LEFT_BUTTON_DOWN;
            }
        }
        else if (mouseEventType === ListenedMouseEventTypes.MOUSE_UP){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_LEFT_BUTTON_UP;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_LEFT_BUTTON_UP
            } else{
                return MouseInputTypes.LEFT_BUTTON_UP;
            }
        }
    }
    else if(buttonPressed === WhichButton.RIGHT){
        if(mouseEventType === ListenedMouseEventTypes.MOUSE_DOWN){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_RIGHT_BUTTON_DOWN;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_RIGHT_BUTTON_DOWN
            } else{
                return MouseInputTypes.RIGHT_BUTTON_DOWN;
            }
        }
        else if (mouseEventType === ListenedMouseEventTypes.MOUSE_UP){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_RIGHT_BUTTON_UP;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_RIGHT_BUTTON_UP
            } else{
                return MouseInputTypes.RIGHT_BUTTON_UP;
            }
        }
    }
    else if(buttonPressed === WhichButton.MIDDLE){
        if(mouseEventType === ListenedMouseEventTypes.MOUSE_DOWN){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_MIDDLE_BUTTON_DOWN;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_MIDDLE_BUTTON_DOWN
            } else{
                return MouseInputTypes.MIDDLE_BUTTON_DOWN;
            }
        }
        else if (mouseEventType === ListenedMouseEventTypes.MOUSE_UP){
            if (event.ctrlKey) {
                return MouseInputTypes.CTRL_MIDDLE_BUTTON_UP;
            } else if(event.shiftKey){
                return MouseInputTypes.SHFT_MIDDLE_BUTTON_UP
            } else{
                return MouseInputTypes.MIDDLE_BUTTON_UP;
            }
        }
    }

    return MouseInputTypes.UNKNOWN_INPUT;
}

function isMouseEvent(event: SyntheticEvent): event is SyntheticMouseEvent {
    const {type} = event;
    return type.includes('click') || type.includes('mouse');
}

function isDragEvent(event: SyntheticEvent) {
    const {type} = event;
    return type.includes('drag');
}