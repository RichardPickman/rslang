import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
