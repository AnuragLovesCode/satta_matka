// src/reducers.ts

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authReducers';

// Configuration for redux-persist
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [], // Add any state properties of authReducer you want to persist here
};

// Combine reducers with redux-persist
const rootReducer :any= combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
