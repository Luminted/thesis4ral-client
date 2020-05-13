import { RootState } from "../store"
import { Middleware, Action } from "redux"

export type MockMiddleware<A> = {
  store: {
    getState: () => RootState
    dispatch: Function
  },
  next: Function,
  invoke: (action: A) => void
}

export function createMockMiddleware<A> ( middleware: Middleware, state?: RootState): MockMiddleware<A> {
    const store = {
      getState: jest.fn(() => (state || {} as RootState)),
      dispatch: jest.fn()
    }
    const next = jest.fn()
  
    const invoke = (action: A) => middleware(store)(next)(action)
  
    return { store, next, invoke }
  }