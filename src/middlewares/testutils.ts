import { TRootState } from "../store"
import { Middleware } from "redux"

export type TMockMiddleware<A> = {
  store: {
    getState: () => Partial<TRootState>
    dispatch: Function
  },
  next: (action: A) => void,
  invoke: (action: A) => void,
  applyMiddleware: Function
}

export const createMockMiddleware = <A>(middleware: Middleware, state?: Partial<TRootState>): TMockMiddleware<A> => {
    const store = {
      getState: jest.fn(() => ({...state})),
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