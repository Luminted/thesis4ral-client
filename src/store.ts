import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {cards} from './reducers';

const rootReducer = combineReducers({
    cards
});

type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

