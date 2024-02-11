// conversationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  role: string;
  message: string;
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: [] as Message[],
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
    clearConversation: () => {
      return [];
    },
  },
});

export const { addMessage, clearConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
