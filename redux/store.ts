import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import { loadState, saveState } from "./localStorage";
const persistedState = loadState();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
  },
  preloadedState: {
    auth: persistedState ?? undefined,
  },
});
store.subscribe(() => {
  saveState(store.getState().auth);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;