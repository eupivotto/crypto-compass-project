import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../redux/cryptoSlice';
import walletReducer from '../redux/walletSlice'

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;