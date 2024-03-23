import { createSlice } from '@reduxjs/toolkit';



interface WalletState {
    account: string;
    balance: string;
    snackbar: {
      open: boolean;
      message: string;
      severity: string;
    };
  }

  const initialState: WalletState = {
    account: '',
    balance: '',
    snackbar: {
      open: false,
      message: '',
      severity: 'info'
    },
  };

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,

    reducers: {
      setAccount: (state, action) => {
        state.account = action.payload;
      },
      setBalance: (state, action) => {
        state.balance = action.payload;
      },
      setTranfer: (state, action) => {
        state.balance = action.payload;
      },
      setSnackbar: (state, action) => {
        state.snackbar = { ...state.snackbar, ...action.payload };
      },
      closeSnackbar: (state) => {
        state.snackbar.open = false;
      },
    },
  });
  
  export const { setAccount, setBalance, setSnackbar, closeSnackbar } = walletSlice.actions;
  
  export default walletSlice.reducer;