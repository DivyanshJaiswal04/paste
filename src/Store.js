import { configureStore } from "@reduxjs/toolkit";
import { PasteSlice } from "./features/PasteSlice";

export const store = configureStore({
  reducer: { paste: PasteSlice.reducer },
});
