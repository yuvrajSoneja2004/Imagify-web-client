import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
  userid: null | string;
  username: string;
  avatarURI: string;
  recentChats: any[];
  email: string;
};

let initialState = {
  value: {
    isAuthenticated: false,
    userid: null,
    username: '',
    email: '',
    avatarURI: '',
    followers: [],
    following: 0,
    bio: '',
    recentChats: [],
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      // console.log('this is payload', action.payload);
      const { _id, username, followers, following, bio, email, recentChats } = action.payload;
      return {
        value: {
          isAuthenticated: true,
          userid: _id,
          username,
          followers,
          following,
          bio,
          email,
          recentChats,
        },
      };
    },
  },
});

export const { login } = auth.actions;
export default auth.reducer;
