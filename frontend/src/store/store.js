import { configureStore } from "@reduxjs/toolkit";
import authRedurer from "../features/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authRedurer,
  },
});
