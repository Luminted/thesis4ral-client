import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// @ts-ignore
import dynamicMiddlewares from "redux-dynamic-middlewares";
import { tableSocketMiddleware, translateVerbPositionMiddleware, upscaleVerbPositionMiddleware } from "./middlewares/";
import { rootReducer } from "./reducers";
import { loadState, saveState } from "./utils";

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    // Order is important
    applyMiddleware(thunk, translateVerbPositionMiddleware, dynamicMiddlewares, upscaleVerbPositionMiddleware, tableSocketMiddleware),
  ),
);

// persisting state
store.subscribe(() => {
  const { clientInfo } = store.getState();
  saveState({
    clientInfo,
  });
});
