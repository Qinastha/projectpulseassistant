import { configureStore } from "@reduxjs/toolkit";
import assistant from "./assistantSlice";

const store = configureStore({
  reducer: {
    assistant,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
