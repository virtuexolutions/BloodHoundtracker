import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import combineReducer from './combineReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'commonReducer'],
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the Serializable State Invariant Middleware
    }),
});

const persistor = persistStore(store);

export {store, persistor};
