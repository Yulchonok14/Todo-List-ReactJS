import { applyMiddleware, combineReducers, createStore } from 'redux';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import todosReducer from './todos/reducers';

const reducers = {
  todosReducer,
};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default configureStore;
