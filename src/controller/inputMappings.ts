import { SharedVerbTypes, CardVerbTypes, DeckVerbTypes } from "../types/verbTypes"
import { MouseInputTypes } from "./types"

//TODO: revise names
export const tableCardInteractionMapping: {[key in MouseInputTypes]?: CardVerbTypes | SharedVerbTypes} = {
    DRAG_START: SharedVerbTypes.GRAB,
    MOUSE_MOVE: SharedVerbTypes.MOVE,
    LEFT_BUTTON_UP: SharedVerbTypes.RELEASE
}

export const handCardInteractionMapping: {[key in MouseInputTypes]?: CardVerbTypes | SharedVerbTypes} = {
    DRAG_START: CardVerbTypes.GRAB_FROM_HAND,
    MOUSE_MOVE: SharedVerbTypes.MOVE,
    LEFT_BUTTON_UP: SharedVerbTypes.RELEASE
}

export const deckInteractionMapping: {[key in MouseInputTypes]?: DeckVerbTypes | SharedVerbTypes} = {
    DRAG_START: SharedVerbTypes.GRAB,
    LEFT_BUTTON_UP: DeckVerbTypes.DRAW_FACE_UP,
    MOUSE_MOVE: SharedVerbTypes.MOVE
}
