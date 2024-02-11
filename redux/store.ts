import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import currentConversation from './features/currentConversation';

export const store = configureStore({
  reducer: {
    authSlice,
    currentConversation,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
