import { createSlice } from "@reduxjs/toolkit";
import { IChat, IUser } from "../core";

interface AssistantState {
  currentUser: IUser | null;
  chats: IChat[];
}

const initialState: AssistantState = {
  currentUser: null,
  chats: [],
};

const assistant = createSlice({
  name: "assistant",
  initialState,
  selectors: {},
  reducers: {},
});

export const {} = assistant.selectors;

export const {} = assistant.actions;

export default assistant.reducer;
