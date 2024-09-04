import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation, IUser } from "../core";

interface AssistantState {
	currentUser: IUser | null;
	chats: IConversation[];
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
