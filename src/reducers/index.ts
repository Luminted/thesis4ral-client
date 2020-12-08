import { combineReducers } from "redux";
import {clientInfo} from "./clientInfo";
import {gameState} from "./gameState";
import {grabbedEntityInfo} from "./grabbedEntityInfo";
import {horizontalScalingRatio} from "./horizontalScalingRatio";
import {tableConnectionStatus} from "./tableConnectionStatus";
import {tablePixelDimensions} from "./tablePixelDimensions";
import {tablePosition} from "./tablePosition";
import {verticalScalingRatio} from "./verticalScalingRatio";
import {isMirrored} from "./isMirrored";

export const rootReducer = combineReducers({
    gameState,
    clientInfo,
    tablePosition,
    tableConnectionStatus,
    horizontalScalingRatio,
    verticalScalingRatio,
    tablePixelDimensions,
    grabbedEntityInfo,
    isMirrored
});

export type TRootState = ReturnType<typeof rootReducer>;