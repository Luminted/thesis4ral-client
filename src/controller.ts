import {
    MouseInput,
    MouseInputTypes
} from './common/mouseEventTypes'
import {
    EntityTypes
} from './common/dataModelDefinitions';
import { MouseEvent as SyntheticMouseEvent} from 'react';
import { MaybeNull } from './common/genericTypes';
import { CardVerbTypes, Verb, SharedVerbTypes, SharedVerb, VerbTypes, DeckVerbTypes } from './common/verbTypes';

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

const cardInteractionMapping: {[key in MouseInputTypes]?: CardVerbTypes | SharedVerbTypes} = {
    LEFT_BUTTON_DOWN: SharedVerbTypes.GRAB,
    MOUSE_MOVE: SharedVerbTypes.MOVE
}

const deckInteractionMapping: {[key in MouseInputTypes]?: DeckVerbTypes | SharedVerbTypes} = {
    CTRL_LEFT_BUTTON_DOWN: SharedVerbTypes.GRAB,
    LEFT_BUTTON_UP: DeckVerbTypes.DRAW_FACE_UP,
    MOUSE_MOVE: SharedVerbTypes.MOVE
}


export function verbFactory(mouseInputType: MouseInputTypes, entityType: MaybeNull<EntityTypes>, entityId: MaybeNull<string>, clientId: string, cursorX: number, cursorY: number): MaybeNull<Verb>{

    if(entityType === EntityTypes.CARD){
        const verbType = cardInteractionMapping[mouseInputType];
        if(verbType){
            return {
                type:verbType,
                clientId,
                cursorX,
                cursorY,
                entityId,
                entityType
            }
        }
    }
    else if(entityType === EntityTypes.DECK){
        const verbType = deckInteractionMapping[mouseInputType];
        if(verbType){
            return{
                type: verbType,
                clientId,
                cursorX,
                cursorY,
                entityId,
                entityType
            }
        }
    }

    return null;
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