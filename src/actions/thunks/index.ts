import { ThunkAction } from "redux-thunk";
import { TActionTypes } from "..";
import { TRootState } from "../../store";

export * from "./emitSharedVerb"
export * from "./emitDeckVerb"
export * from "./emitCardVerb"

export type TThunkResult = ThunkAction<void, TRootState, null, TActionTypes>