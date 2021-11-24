import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

export const store = createStore(rootReducer,persistedState, composedEnhancer)


