// src/store.ts

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer: any = persistReducer(persistConfig, rootReducer);

const store: any = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
