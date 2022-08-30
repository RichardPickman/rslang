import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { AuthActionCreators } from './reducers/authReducer/action-creators';
import { TextbookActionCreators } from './reducers/textbookReducer/action-creators';
import { GameActionCreators } from './reducers/gameReducer/action-creators';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const AllActionCreators = { ...AuthActionCreators, ...TextbookActionCreators, ...GameActionCreators};
