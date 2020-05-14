import { RootState } from "../store"
import { Middleware, Action } from "redux"

export type MockMiddleware<A> = {
  store: {
    getState: () => RootState
    dispatch: Function
  },
  next: (action: A) => void,
  invoke: (action: A) => void,
  applyMiddleware: Function
}

export function createMockMiddleware<A> ( middleware: Middleware, state?: RootState): MockMiddleware<A> {
    const store = {
      getState: jest.fn(() => (state || {} as RootState)),
      dispatch: jest.fn()
    }
    const next = jest.fn()
  
    let invoke = (action: A) => middleware(store)(next)(action)

    const applyMiddleware = () => {
      const boundMiddleware = middleware(store);
      invoke = (action: A) => {
        console.log('applied invoke');
        return boundMiddleware(next)(action);
      }
    }
  
    return { store, next, invoke, applyMiddleware }
  }