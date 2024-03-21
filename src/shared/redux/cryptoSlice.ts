import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getCryptosListing } from '../../services/cryptoApy';
import { CryptoListingType } from '../types/typesCrypto';

interface CryptoState {
  cryptos: CryptoListingType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: CryptoState = {
  cryptos: [],
  status: 'idle',
  error: null,
};

export const fetchCryptos = createAsyncThunk<CryptoListingType[]>(
    'crypto/fetchCryptos',
    async () => {
      const response = await getCryptosListing();
      return response;
    }
  );
  
  const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCryptos.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCryptos.fulfilled, (state, action: PayloadAction<CryptoListingType[]>) => {
          state.status = 'succeeded';
          state.cryptos = action.payload;
        })
        .addCase(fetchCryptos.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default cryptoSlice.reducer;