import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
  userid: null | string;
  username: string;
  avatarURI: string;
};

let initialState = {
  value: {
    isAuthenticated: false,
    userid: null,
    username: '',
    avatarURI: '',
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      return {
        value: {
          isAuthenticated: true,
          username: state.username,
        },
      };
    },
  },
});

export const { login } = auth.actions;
export default auth.reducer;
