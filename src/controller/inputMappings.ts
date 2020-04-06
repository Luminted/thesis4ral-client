import { SharedVerbTypes, CardVerbTypes, DeckVerbTypes } from "../common/verbTypes"
import { MouseInputTypes } from "./types"

export const cardInteractionMapping: {[key in MouseInputTypes]?: CardVerbTypes | SharedVerbTypes} = {
    DRAG_START: SharedVerbTypes.GRAB_FROM_TABLE,
    MOUSE_MOVE: SharedVerbTypes.MOVE,
    LEFT_BUTTON_UP: SharedVerbTypes.RELEASE
}

export const deckInteractionMapping: {[key in MouseInputTypes]?: DeckVerbTypes | SharedVerbTypes} = {
    DRAG_START: SharedVerbTypes.GRAB_FROM_TABLE,
    LEFT_BUTTON_UP: DeckVerbTypes.DRAW_FACE_UP,
    MOUSE_MOVE: SharedVerbTypes.MOVE
}
