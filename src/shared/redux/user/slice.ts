// loginSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { userLogin, logout } = loginSlice.actions;

export default loginSlice.reducer;
