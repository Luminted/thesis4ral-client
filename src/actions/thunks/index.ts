import { ThunkAction } from "redux-thunk";
import { ActionTypes } from "..";
import { RootState } from "../../store";

export * from "./emitSharedVerb"
export * from "./emitDeckVerb"
export * from "./emitCardVerb"

export type ThunkResult = ThunkAction<void, RootState, null, ActionTypes>